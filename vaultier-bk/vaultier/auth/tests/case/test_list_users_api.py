from django.test import TestCase
from rest_framework.status import HTTP_403_FORBIDDEN
from vaultier.auth.tests.tool.users_api import list_users_api_call
from vaultier.base.utils.testtools.rest import response_to_message


class Test(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_should_return_403_for_not_authenticated(self):
        response = list_users_api_call()
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, msg=response_to_message(response))
