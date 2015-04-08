from django.test import TestCase
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_201_CREATED

from vaultier.auth.tests.tool.token_apy import create_token_api_call
from vaultier.auth.tests.tool.users_api import list_users_api_call, create_user_api_call
from vaultier.utils.lib.testtools.rest import response_to_message


class Test(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_should_return_403_for_not_authenticated(self):
        response = list_users_api_call()
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, msg=response_to_message(response))

    def test_normal_authenticated_user_should_list_only_himself(self):
        # create super user
        create_user_api_call(email='ondra@rclick.cz', nickname='ondra')

        # create two users
        create_user_api_call(email='sarka@rclick.cz', nickname='sarka')
        create_user_api_call(email='jan@rclick.cz', nickname='jan')

        # login as jan (not an superuser)
        response = create_token_api_call(email='jan@rclick.cz')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response))
        token = response.data.get('token')

        # should return only logged user
        response = list_users_api_call(token=token)
        self.assertEqual(len(response.data), 1, msg=response_to_message(response, msg='should return only one user'))
        self.assertEqual(response.data[0].get('email'), 'jan@rclick.cz', msg=response_to_message(response, msg='should return jan@rclick.cz'))

    def test_authenticated_super_user_should_list_of_all(self):
        # create super user
        create_user_api_call(email='jan@rclick.cz', nickname='jan')

        # create two users
        create_user_api_call(email='ondra@rclick.cz', nickname='ondra')
        create_user_api_call(email='sarka@rclick.cz', nickname='sarka')

        # login as jan (not an superuser)
        response = create_token_api_call(email='jan@rclick.cz')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response))
        token = response.data.get('token')

        # should return only logged user
        response = list_users_api_call(token=token)
        self.assertEqual(len(response.data), 3, msg=response_to_message(response, msg='should return only one user'))
