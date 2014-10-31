from django.core.urlresolvers import reverse

from vaultier.test.tools import VaultierAPIClient


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


def retrieve_workspace_api_call(token, id):
    url = reverse('workspace-detail', args=(id,))
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


def update_workspace_api_call(token, id, **kwargs):
    url = reverse('workspace-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.put(url, kwargs)
    return response
