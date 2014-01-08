from django.core.urlresolvers import reverse
from vaultier.test.tools import VaultierAPIClient


def invite_member_api_call(token, email=None, workspace=None, send=True, resend=True):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, {
        'email': email,
        'workspace': workspace,
        'send': send,
        'resend': resend
    })
    return response


def accept_invitation_api_call(token, id=None, hash=None):
    url = reverse('member-accept', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, {'hash': hash})
    return response

def list_members_api_call(token, workspace):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url, {'workspace': workspace})
    return response

def list_member_roles_api_call(token, member, hash):
    url = reverse('member-roles', args=(member,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url, {'hash':hash})
    return response

def delete_member_api_call(token, member):
    url = reverse('member-detail', args=(member,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response

def set_workspace_key_api_call(token, member, key):
    url = reverse('member-workspace-key', args=(member,) )
    client = VaultierAPIClient()
    client.token(token)
    response = client.put(url, {'workspace_key': key})
    return response


def get_workspace_key_api_call(token, member):
    url = reverse('member-workspace-key', args=(member,) )
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response