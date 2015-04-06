from django.core.urlresolvers import reverse
from rest_framework.test import APIClient
from vaultier.auth.lib.authenticator import Authenticator
from vaultier.auth.tests.tool.users_api import private_key_fixture


def create_token_api_call(*args, **kwargs):
    kwargs.setdefault('email', 'jan@rclick.cz')
    kwargs.setdefault('servertime', Authenticator.get_servertime())
    kwargs.setdefault('signature', Authenticator.sign(private_key_fixture(), kwargs.get('email'), kwargs.get('servertime')))

    url = reverse('token-list')
    client = APIClient()
    response = client.post(url, kwargs)
    return response

def destroy_token_api_call(token=None, id=None, *args, **kwargs):
    url = reverse('token-list', args=(id,))
    client = APIClient()
    if (token):
        client.credentials(HTTP_X_VAULTIER_TOKEN=token)

    response = client.delete(url, kwargs)
    return response
