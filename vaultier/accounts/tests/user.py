from datetime import timedelta
from django.test.testcases import TransactionTestCase
from django.conf import settings
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from accounts.business.authentication import Backend
from accounts.models import Token
from libs.version.context import version_context_manager
from .api import auth_api_call, register_api_call
from vaultier.test.tools import FileAccessMixin, format_response
from django.utils import timezone


class SignaturesTest(TransactionTestCase, FileAccessMixin):

    def test_rsa(self):
        email = 'jan.misek@rclick.cz'
        privkey = self.read_file('vaultier.key')
        pubkey = self.read_file('vaultier.pub')
        signature = Backend.sign(privkey, email, 1)

        self.assertTrue(Backend.verify(pubkey, email, 1, signature))
        self.assertFalse(Backend.verify(pubkey, 'Unsigned text', 1, signature))


class ApiRegisterTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_register(self):
        # register user
        email = 'jan.misek@rclick.cz'
        response = register_api_call(email=email, nickname='Misan')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code, HTTP_201_CREATED,
                         msg=format_response(response))

        # register user again should be forbidden
        response = register_api_call(email=email, nickname='Misan')
        self.assertTrue(response.data.get('email') is not None)
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST,
                         msg=format_response(response))

    def test_020_auth(self):
        # register user
        email = 'jan.misek@rclick.cz'
        response = register_api_call(email=email, nickname='Misan')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code, HTTP_201_CREATED,
                         msg=format_response(response))

        # try to login, check proper signature
        response = auth_api_call(email=email)
        self.assertEqual(response.status_code, HTTP_200_OK,
                         msg=format_response(response))

        # try to login, check wrong signature
        response = auth_api_call(email=email, signature='WrongSignature')
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         msg=format_response(response))

        # try to login, check wrong expired timestamp
        expired = timezone.now() - timedelta(days=15)
        response = auth_api_call(email=email, date=expired,
                                 signature='WrongSignature')
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         msg=format_response(response))

    def test_030_registration_should_be_case_insensitive(self):
        # register user
        email = 'TeSt.CaSe.InSeSiTiVe@rclick.cz'
        response = register_api_call(email=email, nickname='case_insensitive')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code, HTTP_201_CREATED,
                         msg=format_response(response))

        # login with the email to lower case
        response = auth_api_call(email=email.lower())
        self.assertEqual(response.status_code, HTTP_200_OK,
                         msg=format_response(response))
        self.assertEqual(response.data.get('user'), self.id,
                         'User could be logged with the LOWER case '
                         'version of the email'
                         )

        response = auth_api_call(email=email.upper())
        self.assertEqual(response.status_code, HTTP_200_OK,
                         msg=format_response(response)
                         )
        self.assertEqual(response.data.get('user'), self.id,
                         'User could be logged with the UPPER case '
                         'version of the email'
                         )

        # register user
        email = 'TEST_UPPERCASE_REGISTRATION@rclick.cz'
        response = register_api_call(email=email,
                                     nickname='UPPERCASE_REGISTRATION')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code,
                         HTTP_201_CREATED,
                         msg=format_response(response)
                         )

        # login with the email to lower case
        response = auth_api_call(email=email.lower())
        self.assertEqual(response.status_code,
                         HTTP_200_OK,
                         msg=format_response(response)
                         )

    def test_040_email_cannot_be_registered_more_than_once(self):
        # register user
        email = 'test.040@rclick.cz'
        response = register_api_call(email=email, nickname='test040')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code,
                         HTTP_201_CREATED,
                         msg=format_response(response)
                         )

        email = 'TEST.040@rclick.cz'
        response = register_api_call(email=email, nickname='test040')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code,
                         HTTP_400_BAD_REQUEST,
                         msg=format_response(response)
                         )
        self.assertEqual(response.data.get('email'),
                         [u'User with this Email already exists.'],
                         'The email was already registered'
                         )
        # register user
        email = 'TEST_040@rclick.cz'
        response = register_api_call(email=email, nickname='test040')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code,
                         HTTP_201_CREATED,
                         msg=format_response(response)
                         )

        email = 'test_040@rclick.cz'
        response = register_api_call(email=email, nickname='test040')
        self.id = response.data.get('id')
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST,
                         msg=format_response(response))
        self.assertEqual(response.data.get('email'),
                         [u'User with this Email already exists.'],
                         'The email was already registered')


class TokenExpirationTest(TransactionTestCase):

    def test_010_token_renewed(self):
        # register user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan')
        response = auth_api_call(email=email)
        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """
        td = timedelta(days=-1)
        last_used_at = timezone.now() - td
        token_model.last_used_at = last_used_at
        token_model.save()

        # current date should be set, limit 60 seconds in case of some slowdown
        self.assertTrue(
            (timezone.now() - token_model.last_used_at).total_seconds() < 60)

    def test_020_token_not_renewed_immediately(self):
        # register user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan')
        response = auth_api_call(email=email)
        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """

        last_used_at = token_model.last_used_at
        token_model.save()

        # last_used_at not changed
        self.assertEqual(last_used_at, token_model.last_used_at)

    def test_030_old_token_cleaned_up(self):
        # register user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan')
        response = auth_api_call(email=email)
        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        td = timedelta(hours=2 * token_lifetime)
        last_used_at = timezone.now() - td
        token_model.last_used_at = last_used_at
        token_model.save()

        Token.objects.clean_old_tokens()
        self.assertEqual(Token.objects.all().count(), 0)

    def test_040_recent_token_not_cleaned_up(self):
        # register user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan')
        response = auth_api_call(email=email)
        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        td = timedelta(hours=token_lifetime - 1)
        last_used_at = timezone.now() - td

        token_model.last_used_at = last_used_at
        token_model.save()

        Token.objects.clean_old_tokens()
        # token not deleted
        self.assertEqual(Token.objects.all().count(), 1)


def test_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(SignaturesTest))
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiRegisterTest))
    suite.addTest(
        unittest.TestLoader().loadTestsFromTestCase(TokenExpirationTest))
    return suite
