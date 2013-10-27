from django.core.urlresolvers import reverse
from django.test.testcases import TestCase
import json
from rest_framework.status import HTTP_201_CREATED
from rest_framework.test import APIClient
from vaultier.settings import PROJECT_ROOT


def format_response(response):
        data = json.dumps(response.data)
        code = str(response.status_code)
        return 'code:'+code+', json:'+data

def register_api_call(*args, **kwargs):
    pubkey = open(PROJECT_ROOT+'/core/test/fixtures/vaultier.pub', 'r').read()
    kwargs['public_key'] = pubkey

    client = APIClient()
    url = reverse('auth-user')
    response = client.post(url, kwargs)
    return response


class ApiRegister(TestCase):
    def test_register(self):
        response = register_api_call(email='jan.misek@rclick.cz', nickname='Misan')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=format_response(response))

        response = register_api_call(email='stepan.bokoc@rclick.cz', nickname='Stepan')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=format_response(response))

        response = register_api_call(email='jakub.bokoc@rclick.cz', nickname='Jakub')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=format_response(response))

        response = register_api_call(email='tomas.plesek@rclick.cz', nickname='Tomas')
        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=format_response(response))

