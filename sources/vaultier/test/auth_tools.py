from django.core.urlresolvers import reverse
from rest_framework.test import APIClient
from vaultier.auth.authentication import Backend
from app.settings import PROJECT_ROOT


def auth_api_call(email=None, signature=None):
    url = reverse('auth-auth')
    client = APIClient()

    if not signature:
        privkey = open(PROJECT_ROOT+'/vaultier/test/fixtures/vaultier.key').read()
        signature = Backend.sign(privkey, email)

    response = client.post(url, {'email': email, 'signature':signature})
    return response


def register_api_call(*args, **kwargs):
    pubkey = open(PROJECT_ROOT+'/vaultier/test/fixtures/vaultier.pub', 'r').read()
    kwargs['public_key'] = pubkey

    url = reverse('auth-user')
    client = APIClient()
    response = client.post(url, kwargs)
    return response