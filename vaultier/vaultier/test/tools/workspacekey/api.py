from django.core.urlresolvers import reverse

from vaultier.test.tools import VaultierAPIClient


def set_workspace_key_api_call(token, member, key):
    url = reverse('workspace_key-detail', args=(member,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.put(url, {'workspace_key': key})
    return response


def get_workspace_key_api_call(token, member):
    url = reverse('workspace_key-detail', args=(member,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def list_workspace_key_api_call(token):
    url = reverse('workspace_key-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response
