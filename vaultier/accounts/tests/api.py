from time import time
from django.core.urlresolvers import reverse
from rest_framework.test import APIClient
# todo: Backend?
# from accounts.business.authentication import Backend
from accounts.business.fields import RecoverTypeField
from vaultier.test.tools import FileAccessMixin, VaultierAPIClient
from django.utils import timezone


def auth_api_call(email=None, date=None, signature=None):
    url = reverse('auth-auth')
    client = APIClient()
    m = FileAccessMixin()

    if not date:
        date = timezone.now()

    if not signature:
        privkey = m.read_file('vaultier.key')
        # todo: Backend?
        # signature = Backend.sign(privkey, email, date)
        signature = None

    response = client.post(url, {'email': email,
                                 'date': date,
                                 'signature': signature}
                           )
    return response


def register_api_call(*args, **kwargs):
    m = FileAccessMixin()
    pubkey = m.read_file('vaultier.pub')
    kwargs['public_key'] = pubkey

    url = reverse('user-list')
    client = APIClient()
    kwargs.update({'timestamp': int(time())})
    response = client.post(url, kwargs)
    return response


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


def create_lost_keys_api_call(email, **kwargs):
    """
    Call to lost_key create view
    :param email: user email
    :param kwargs:
    :return: Response
    """
    client = VaultierAPIClient()
    kwargs['email'] = email
    url = reverse('lost_keys-list')
    response = client.post(url, data={'email': email}, kwargs=kwargs)
    return response


def update_lost_key_api_rebuild_call(lost_key_id, auth_hash=None,
                                     public_key=None):
    """
    Call to update view with parameter recover_type set to
    RecoverTypeField.REBUILD
    :param lost_key_id: int
    :param auth_hash: str
    :param public_key: str
    :return: Response
    """
    client = VaultierAPIClient()
    url = "{}?hash={}".format(reverse('lost_keys-detail', args=(lost_key_id,)),
                              auth_hash)
    return client.put(url, data={
        'public_key': public_key, 'recover_type': RecoverTypeField.REBUILD})


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


def retrieve_lost_key_api_call(lost_key_id, auth_hash=None):
    """
    Call to retrieve view
    :param lost_key_id: int
    :param auth_hash: str
    :return: Response
    """
    client = VaultierAPIClient()
    url = "{}?hash={}".format(reverse('lost_keys-detail', args=(lost_key_id,)),
                              auth_hash)
    return client.get(url)
