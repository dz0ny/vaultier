from datetime import timedelta

import pytest
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_400_BAD_REQUEST
from django.conf import settings

from accounts.models import User, Token
from vaultier.test.tools import FileAccessMixin
from accounts.tests.testutils.test_api_utils import *


@pytest.mark.django_db
class TestSignatures(object):
    def test_rsa(self):
        email = "duke.nukem@rclick.cz"
        m = FileAccessMixin()
        privkey = m.read_file('vaultier.key')
        pubkey = m.read_file('vaultier.pub')

        signature = Authenticator.sign(privkey, email, 1)

        assert Authenticator.verify(pubkey, email, 1, signature) is True
        assert Authenticator.verify(pubkey, 'Unsigned text', 1,
                                    signature) is not True


@pytest.mark.django_db
class TestApiRegister(object):
    # testing methods
    def test_010_register(self, pubkey):
        # register user
        response = register_user(public_key=pubkey,
                                 nickname="duke",
                                 email="duke.nukem@example.com")
        # test the response
        assert (response.status_code == HTTP_201_CREATED)
        assert (response.data.get('id') is not None)
        id = response.data.get('id')

        # test if user was created in database
        assert (User.objects.filter(id=id).exists())

        # register user again should be forbidden
        response = register_user(public_key=pubkey,
                                 nickname="duke",
                                 email="duke.nukem@example.com")

        assert (response.data.get('email') is not None)
        assert (response.status_code == HTTP_400_BAD_REQUEST)

    def test_020_auth(self, user1, privkey):
        date = timezone.now()

        # try to login, check good signature
        response = authenticate_user(private_key=privkey,
                                     email=user1.email)

        assert (response.status_code == HTTP_200_OK)

        # try to login, check wrong signature
        bad_signature = "DefinitelyBadSignature"
        response = authenticate_user(email=user1.email,
                                     signature=bad_signature)

        # todo: currently returns 400, ideally should 403
        assert (response.status_code == HTTP_400_BAD_REQUEST)

        # try to login, check wrong expired timestamp
        expired = timezone.now() - timedelta(days=15)
        response = authenticate_user(private_key=privkey,
                                     email=user1.email, date=expired)

        assert (response.status_code == HTTP_400_BAD_REQUEST)

    def test_030_registration_should_be_case_insensitive(self, pubkey, privkey):
        # registration with multicase email and auth with lowercase
        # register user


        email = 'TeSt.CaSe.InSeSiTiVe@rclick.cz'

        response = register_user(public_key=pubkey,
                                 nickname="case_insensitive", email=email)

        assert (response.status_code == HTTP_201_CREATED)

        # try auth with same email in lower case
        response = authenticate_user(private_key=privkey,
                                     email=email.lower())

        assert (response.status_code == HTTP_200_OK)

        # login with the email in UPPER CASE
        response = authenticate_user(private_key=privkey,
                                     email=email.upper())

        assert (response.status_code == HTTP_200_OK)

        # register user
        email = 'TEST_UPPERCASE_REGISTRATION@rclick.cz'
        response = register_user(public_key=pubkey,
                                 nickname="UPPER_CASE_NICK", email=email)

        assert (response.status_code == HTTP_201_CREATED)

        # login with the email to lower case
        response = authenticate_user(private_key=privkey,
                                     email=email.lower())

        assert (response.status_code == HTTP_200_OK)

    def test_040_email_cannot_be_registered_more_than_once(self, user1, user2,
                                                           pubkey):
        # try to register user from fixture again

        response = register_user(public_key=pubkey, email=user1.email,
                                 nickname=user1.nickname)

        assert (response.status_code == HTTP_400_BAD_REQUEST)
        assert (
            response.data.get('email') == [
                u'User with this Email already exists.'])

        # try to register user2 from fixture with same but uppercase mail
        response = register_user(public_key=pubkey,
                                 email=user2.email.upper(),
                                 nickname=user2.nickname)

        assert (response.status_code == HTTP_400_BAD_REQUEST)
        assert (
            response.data.get('email') == [
                u'User with this Email already exists.'])


class TestTokenExpiration(object):
    def test_010_token_renewed(self, user1, privkey):
        response = authenticate_user(private_key=privkey,
                                     email=user1.email)

        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """
        td = timedelta(days=-1)
        last_used_at = timezone.now() - td
        token_model.last_used_at = last_used_at
        token_model.save()

        # current date should be set, limit 60 seconds in case of some slowdown
        assert (
            (timezone.now() - token_model.last_used_at).total_seconds() < 60)

    def test_020_token_not_renewed_immediately(self, user1, privkey):
        response = authenticate_user(private_key=privkey,
                                     email=user1.email)

        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """

        last_used_at = token_model.last_used_at
        token_model.save()

        # last_used_at not changed
        assert (last_used_at == token_model.last_used_at)

    def test_030_old_token_cleaned_up(self, user1, privkey):
        response = authenticate_user(private_key=privkey,
                                     email=user1.email)

        token = response.data.get('token')

        token_model = Token.objects.get(token=token)
        """:type : Token """
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        td = timedelta(hours=2 * token_lifetime)
        last_used_at = timezone.now() - td
        token_model.last_used_at = last_used_at
        token_model.save()

        Token.objects.clean_old_tokens()
        assert (Token.objects.all().count() == 0)

    def test_040_recent_token_not_cleaned_up(self, user1, privkey):
        response = authenticate_user(private_key=privkey,
                                     email=user1.email)

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
        assert (Token.objects.all().count() == 1)
