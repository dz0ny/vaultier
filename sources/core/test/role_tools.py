from django.core.urlresolvers import reverse
from core.test.tools import VaultierAPIClient

__author__ = 'jan'


def create_role_api_call(token, member=None, to_workspace=None, to_vault=None, to_card=None, level=None):
    url = reverse('role-list')
    client = VaultierAPIClient()
    client.token(token)

    data = {
        'member':member,
        'level':level
    }

    if to_workspace:
        data['to_workspace'] = to_workspace
    if to_vault:
        data['to_vault'] = to_vault
    if to_card:
        data['to_card'] = to_card

    response = client.post(url, data)
    return response