from django.core.urlresolvers import reverse

from vaultier.test.tools import VaultierAPIClient


def invite_member_api_call(token, email=None, workspace=None, send=True,
                           resend=True):
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


def list_members_api_call(token, workspace):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url, {'workspace': workspace})
    return response


def delete_member_api_call(token, member):
    url = reverse('member-detail', args=(member,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response
