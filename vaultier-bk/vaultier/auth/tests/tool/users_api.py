import os
from django.core.urlresolvers import reverse
from rest_framework.test import APIClient

def public_key_fixture(*args, **kwargs):
    currdir = os.path.dirname(__file__)
    filename = os.path.join(currdir, '../fixture/vaultier.pub')
    file = open(filename, 'r')
    data = file.read()
    file.close()
    return data


def private_key_fixture(*args, **kwargs):
    currdir = os.path.dirname(__file__)
    filename = os.path.join(currdir, '../fixture/vaultier.key')
    file = open(filename, 'r')
    data = file.read()
    file.close()
    return data


def create_user_api_call(*args, **kwargs):
    kwargs.setdefault('public_key', public_key_fixture())
    kwargs.setdefault('email', 'jan@rclick.cz')
    kwargs.setdefault('nickname', 'jan')

    url = reverse('user-list')
    client = APIClient()
    response = client.post(url, kwargs)
    return response


def list_users_api_call(token=None, *args, **kwargs):
    url = reverse('user-list')
    client = APIClient()
    if (token):
        client.credentials(HTTP_X_VAULTIER_TOKEN=token)

    response = client.get(url, kwargs)
    return response

def destroy_user_api_call(id, token=None, *args, **kwargs):
    url = reverse('user-detail', args=(id,))
    client = APIClient()
    if (token):
        client.credentials(HTTP_X_VAULTIER_TOKEN=token)

    response = client.delete(url, kwargs)
    return response

def update_user_api_call(id, token=None, *args, **kwargs):
    url = reverse('user-detail', args=(id,))
    client = APIClient()
    if (token):
        client.credentials(HTTP_X_VAULTIER_TOKEN=token)

    response = client.patch(url, kwargs)
    return response

