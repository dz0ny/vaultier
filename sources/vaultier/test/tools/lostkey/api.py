from django.core.urlresolvers import reverse
from vaultier.test.tools import VaultierAPIClient


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


def update_lost_key_api_call(lost_key_id, auth_hash=None, public_key=None):
    """
    Call to update view
    :param lost_key_id: int
    :param auth_hash: str
    :param public_key: str
    :return: Response
    """
    client = VaultierAPIClient()
    url = reverse('lost_keys-detail', args=(lost_key_id,)) + '?hash=' + auth_hash
    return client.put(url, data={'public_key': public_key})


def retrieve_lost_key_api_call(lost_key_id, auth_hash=None):
    """
    Call to retrieve view
    :param lost_key_id: int
    :param auth_hash: str
    :return: Response
    """
    client = VaultierAPIClient()
    url = reverse('lost_keys-detail', args=(lost_key_id,)) + '?hash=' + auth_hash
    return client.get(url)