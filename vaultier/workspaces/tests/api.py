from django.core.urlresolvers import reverse
from vaultier.test.tools import VaultierAPIClient


def accept_invitation_api_call(token, pk=None, hash=None):
    url = reverse('invitation-detail', args=(hash,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.put(url)
    return response


def retrieve_invitation_api_call(token, member, hash):
    url = reverse('invitation-detail', args=(hash,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def create_workspace_api_call(token, **kwargs):
    url = reverse('workspace-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, kwargs)
    return response


def delete_workspace_api_call(token, id):
    url = reverse('workspace-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response


def retrieve_workspace_api_call(token, pk):
    url = reverse('workspace-detail', args=(pk,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def list_workspaces_api_call(token):
    url = reverse('workspace-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def update_workspace_api_call(token, pk, **kwargs):
    url = reverse('workspace-detail', args=(pk,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.put(url, kwargs)
    return response


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
