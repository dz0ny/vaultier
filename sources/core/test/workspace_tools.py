from django.core.urlresolvers import reverse
from core.test.tools import VaultierAPIClient

__author__ = 'jan'


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


def list_workspaces_api_call(token):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response