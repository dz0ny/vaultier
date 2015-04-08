from django.test import TestCase
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_201_CREATED, HTTP_200_OK, HTTP_405_METHOD_NOT_ALLOWED

from vaultier.auth.tests.tool.token_apy import create_token_api_call
from vaultier.auth.tests.tool.users_api import create_user_api_call, update_user_api_call, \
    destroy_user_api_call
from vaultier.utils.lib.testtools.rest import response_to_message


class Test(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_normal_authenticated_user_should_delete_and_update_only_himself(self):
        # create super user
        superuser = create_user_api_call(email='ondra@rclick.cz', nickname='ondra')

        # create two users
        create_user_api_call(email='sarka@rclick.cz', nickname='sarka')
        normaluser = create_user_api_call(email='jan@rclick.cz', nickname='jan')

        # login as jan (not an superuser)
        response = create_token_api_call(email='jan@rclick.cz')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response))
        token = response.data.get('token')

        # should not update other user
        response = update_user_api_call(superuser.data.get('id'), token=token)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, msg=response_to_message(response, msg='should not update other user'))

        # should update himself
        response = update_user_api_call(normaluser.data.get('id'), token=token)
        self.assertEqual(response.status_code, HTTP_200_OK, msg=response_to_message(response, msg='should update himself'))

        # should not destroy
        response = destroy_user_api_call(normaluser.data.get('id'), token=token)
        self.assertEqual(response.status_code, HTTP_405_METHOD_NOT_ALLOWED, msg=response_to_message(response, msg='method should not be allowed'))


    def test_authenticated_super_user_should_delete_and_update_others(self):
        # create super user
        superuser = create_user_api_call(email='jan@rclick.cz', nickname='jan')

        # create two users
        create_user_api_call(email='sarka@rclick.cz', nickname='sarka')
        normaluser = create_user_api_call(email='ondra@rclick.cz', nickname='ondra')

        # login as jan (superuser)
        response = create_token_api_call(email='jan@rclick.cz')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=response_to_message(response))
        token = response.data.get('token')

        # should update other user
        response = update_user_api_call(normaluser.data.get('id'), token=token)
        self.assertEqual(response.status_code, HTTP_200_OK, msg=response_to_message(response, msg='should update other users'))

