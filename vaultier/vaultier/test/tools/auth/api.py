import time

from django.core.urlresolvers import reverse
from django.utils import timezone
from rest_framework.test import APIClient

from accounts.business.authentication import Authenticator
from vaultier.test.tools import FileAccessMixin


def auth_api_call(email=None, date=None, signature=None):
    url = reverse('auth-auth')
    client = APIClient()
    m = FileAccessMixin()

    if not date:
        date = timezone.now()

    if not signature:
        privkey = m.read_file('vaultier.key')
        signature = Authenticator.sign(privkey, email, date)

    response = client.post(
        url, {'email': email, 'date': date, 'signature': signature})
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
