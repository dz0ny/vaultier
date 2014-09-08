from django.core.urlresolvers import reverse
from vaultier.test.tools import VaultierAPIClient


def create_secret_api_call(token, **kwargs):
    url = reverse('secret-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, kwargs)
    return response


def delete_secret_api_call(token, id):
    url = reverse('secret-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response


def retrieve_secret_api_call(token, id):
    url = reverse('secret-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def list_secrets_api_call(token, card=None):
    url = reverse('secret-list')
    client = VaultierAPIClient()
    client.token(token)

    data = {}
    if (card):
        data['card'] = card

    response = client.get(url, **data)
    return response


def update_secret_api_call(token, id, **kwargs):
    url = reverse('secret-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.patch(url, data=kwargs)
    return response


def create_secret_blob_api_call(token, **kwargs):
    url = reverse('secret_blob-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, kwargs)
    return response


def delete_secret_blob_api_call(token, id):
    url = reverse('secret_blob-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response


def retrieve_secret_blob_api_call(token, id):
    url = reverse('secret_blob-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def update_secret_blob_api_call(token, id, **kwargs):
    url = reverse('secret_blob-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.patch(url, kwargs, format='multipart')
    return response


def list_secrets_blob_api_call(token, **kwargs):
    url = reverse('secret_blob-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url, **kwargs)
    return response
