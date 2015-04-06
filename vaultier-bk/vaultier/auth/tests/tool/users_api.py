import os
from django.core.urlresolvers import reverse
from rest_framework.test import APIClient

# def auth_api_call(email=None, signature=None):
# url = reverse('auth-auth')
#     client = APIClient()
#     m = FileAccessMixin()
#
#     if not signature:
#         privkey = m.read_file('vaultier.key')
#         signature = Backend.sign(privkey, email)
#
#     response = client.post(url, {'email': email, 'signature':signature})
#     return response

def public_key(*args, **kwargs):
    currdir = os.path.dirname(__file__)
    filename = os.path.join(currdir, '../fixture/vaultier.pub')
    file = open(filename, 'r')
    data = file.read()
    file.close()
    return data


def create_user_api_call(*args, **kwargs):
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