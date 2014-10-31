from django.core.urlresolvers import reverse

from vaultier.test.tools import VaultierAPIClient


def create_role_api_call(token, member, to_workspace=None, to_vault=None,
                         to_card=None, level=None):
    url = reverse('role-list')
    client = VaultierAPIClient()
    client.token(token)

    data = {
        'member': member,
        'level': level
    }

    if to_workspace:
        data['to_workspace'] = to_workspace
    if to_vault:
        data['to_vault'] = to_vault
    if to_card:
        data['to_card'] = to_card

    response = client.post(url, data)
    return response


def update_role_api_call(token, id, level):
    url = reverse('role-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)

    data = {
        'level': level
    }

    response = client.put(url, data)
    return response


def delete_role_api_call(token, id):
    url = reverse('role-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response


def list_role_api_call(token, to_workspace=None, to_vault=None, to_card=None):
    url = reverse('role-list')
    client = VaultierAPIClient()
    client.token(token)

    data = {}

    if to_workspace:
        data['to_workspace'] = to_workspace
    if to_vault:
        data['to_vault'] = to_vault
    if to_card:
        data['to_card'] = to_card

    response = client.get(url, data)
    return response
