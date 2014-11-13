from django.core.urlresolvers import reverse

from accounts.business.fields import RecoverTypeField
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


def update_lost_key_api_disable_call(lost_key_id, auth_hash=None,
                                     public_key=None):
    """
    Call to update view with parameter recover_type set to
    RecoverTypeField.DISABLE
    :param lost_key_id: int
    :param auth_hash: str
    :param public_key: str
    :return: Response
    """
    client = VaultierAPIClient()
    url = "{}?hash={}".format(reverse('lost_keys-detail', args=(lost_key_id,)),
                              auth_hash)
    return client.put(url, data={
        'public_key': public_key, 'recover_type': RecoverTypeField.DISABLE})
