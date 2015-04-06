import iso8601
from datetime import datetime
from django.test import TestCase
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_201_CREATED, HTTP_200_OK, HTTP_401_UNAUTHORIZED
from vaultier.auth.lib.authenticator import Authenticator
from vaultier.auth.tests.tool.servertime_api import get_servertime_api_call
from vaultier.auth.tests.tool.token_apy import create_token_api_call
from vaultier.auth.tests.tool.users_api import list_users_api_call, public_key_fixture, private_key_fixture, \
    create_user_api_call
from vaultier.base.utils.testtools.rest import response_to_message


class Test(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_rsa_signature(self):
        email = 'jan@rclick.cz'
        privkey = private_key_fixture()
        pubkey = public_key_fixture()
        time = iso8601.parse_date(datetime.utcnow().isoformat())
        signature = Authenticator.sign(privkey, email,time)

        self.assertTrue(Authenticator.verify(pubkey, email, time, signature))
        self.assertFalse(Authenticator.verify(pubkey, 'Unsigned text', time, signature))

    def test_success_login_workflow_including_server_time(self):

        # register
        response = create_user_api_call()
        email = response.data['email']
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response, 'should create user'))

        # get server time
        response = get_servertime_api_call()
        servertime = response.data['datetime']
        self.assertEqual(response.status_code, HTTP_200_OK, msg=response_to_message(response, 'should return servertime'))

        # create signature
        private_key = private_key_fixture()
        signature = Authenticator.sign(private_key, email, servertime)

        # assert create token
        response = create_token_api_call(servertime=servertime, email=email, signature=signature)
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response, 'should create token'))

    def test_login_workflow_with_wrong_signature(self):

        # register
        response = create_user_api_call()
        email = response.data['email']
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response, 'should create user'))

        # get server time
        response = get_servertime_api_call()
        servertime = response.data['datetime']
        self.assertEqual(response.status_code, HTTP_200_OK, msg=response_to_message(response, 'should return servertime'))

        # assert create token
        response = create_token_api_call(servertime=servertime, email=email, signature='wrong signature')
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, msg=response_to_message(response, 'should not create token'))
        self.assertEqual(response.data.get('code'), 'InvalidSignatureException', msg=response_to_message(response, 'should not create token'))

    def test_login_workflow_with_wrong_email(self):

        # register
        response = create_user_api_call()
        email = response.data['email']
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response, 'should create user'))

        # get server time
        response = get_servertime_api_call()
        servertime = response.data['datetime']
        self.assertEqual(response.status_code, HTTP_200_OK, msg=response_to_message(response, 'should return servertime'))

        # create signature
        private_key = private_key_fixture()
        signature = Authenticator.sign(private_key, email, servertime)

        # assert create token with valid but non-existent email
        response = create_token_api_call(servertime=servertime, email='jan@b.cz', signature=signature)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, msg=response_to_message(response, 'should not create token'))
        self.assertEqual(response.data.get('code'), 'InvalidUserException', msg=response_to_message(response, 'should not create token'))

        # assert create token with invalid email
        response = create_token_api_call(servertime=servertime, email='invalid email address', signature=signature)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, msg=response_to_message(response, 'should not create token'))
        self.assertEqual(response.data.get('code'), 'ValidationError', msg=response_to_message(response, 'should not create token'))

