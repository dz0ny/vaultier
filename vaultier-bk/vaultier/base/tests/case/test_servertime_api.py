from django.test import TestCase
from rest_framework.status import HTTP_200_OK

from vaultier.base.tests.tool.servertime_api import get_servertime_api_call
from vaultier.utils.lib.testtools.rest import response_to_message


class Test(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_servertime_api_should_return_http_ok(self):
        response = get_servertime_api_call()
        self.assertEqual(response.status_code, HTTP_200_OK, msg=response_to_message(response, 'should return servertime'))

