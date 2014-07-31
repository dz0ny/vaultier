import time
from django.core.urlresolvers import reverse
from rest_framework.test import APIClient
from vaultier.auth.authentication import Backend
from app.settings import PROJECT_ROOT
from vaultier.test.tools import FileAccessMixin


def auth_api_call(email=None, js_timestamp=None, signature=None):
    url = reverse('auth-auth')
    client = APIClient()
    m = FileAccessMixin()

    if not signature:
        privkey = m.read_file('vaultier.key')
        js_timestamp = get_timestamp()

        signature = Backend.sign(privkey, email + str(js_timestamp))

    response = client.post(url, {'email': email, 'js_timestamp': js_timestamp, 'signature': signature})
    return response


def register_api_call(*args, **kwargs):
    m = FileAccessMixin()
    pubkey = m.read_file('vaultier.pub')
    kwargs['public_key'] = pubkey

    url = reverse('user-list')
    client = APIClient()
    response = client.post(url, kwargs)
    return response


def get_timestamp():
    return int(round(time.time() * 1000))