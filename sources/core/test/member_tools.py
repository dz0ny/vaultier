from django.core.urlresolvers import reverse
from core.test.tools import VaultierAPIClient


def invite_member_api_call(token, email=None, workspace=None):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, {'email':email, 'workspace':workspace})
    return response


def accept_invitation_api_call(token, id=None, hash=None):
    url = reverse('member-accept', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, {'hash':hash })
    return response


def list_members_api_call(token, workspace=None):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url, {'workspace': workspace} if workspace is not None else None)
    return response