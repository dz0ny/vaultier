import os
from django.core.urlresolvers import reverse
from rest_framework.test import APIClient

def create_token_api_call(*args, **kwargs):
    # kwargs.setdefault('signature', public_key_fixture())
    # kwargs.setdefault('email', 'jan@rclick.cz')
    # kwargs.setdefault('nickname', 'jan')

    url = reverse('token-list')
    client = APIClient()
    response = client.post(url, kwargs)
    return response

