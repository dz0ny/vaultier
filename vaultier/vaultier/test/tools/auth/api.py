import time

from django.core.urlresolvers import reverse
from rest_framework.test import APIClient

from vaultier.auth.authentication import Backend
from vaultier.test.tools import FileAccessMixin


def auth_api_call(email=None, timestamp=None, signature=None):
    url = reverse('auth-auth')
    client = APIClient()
    m = FileAccessMixin()

    if not timestamp:
        timestamp = get_timestamp()

    if not signature:
        privkey = m.read_file('vaultier.key')
        signature = Backend.sign(privkey, email, timestamp)

    response = client.post(url, {'email': email, 'timestamp': timestamp, 'signature': signature})
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
    return int(time.time())