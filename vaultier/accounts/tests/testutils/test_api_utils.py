from time import time

from django.utils import timezone

from rest_framework.test import APIClient
from django.core.urlresolvers import reverse

from vaultier.test.tools import VaultierAPIClient

from accounts.business.authentication import Authenticator
from accounts.business.fields import RecoverTypeField


def create_signature(key, email, date):
    """
    call to user authenticate view

    :param email: user email
    :param key: str
    :param date: date
    :return: str
    """
    return Authenticator.sign(key, email, date)


def register_user(public_key, nickname, email):
    """
    call to user registration view

    :param email: user email
    :param public_key: str
    :param nickname: str
    :return: Response
    """
    client = APIClient()
    url = reverse('user-list')
    response = client.post(url, {
        "nickname": nickname,
        "email": email,
        "timestamp": int(time()),
        "public_key": public_key,
    })
    return response


def authenticate_user(email, date=None, private_key=None, signature=None):
    """
    call to user authenticate view

    :param email: user email
    :param private_key: str
    :param signature: str
    :return: Response
    """
    client = APIClient()
    url = reverse('auth-auth')
    if not date:
        date = timezone.now()
    response = None
    if not signature:
        signature = create_signature(key=private_key, email=email,
                                     date=date)

    response = client.post(url, {'email': email,
                                 'date': date,
                                 'signature': signature
    })
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
