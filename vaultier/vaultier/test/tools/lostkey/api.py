from django.core.urlresolvers import reverse

# todo: RecoverTypeField?
# from vaultier.models.lostkey.fields import RecoverTypeField
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
    url = reverse('lost_keys-detail',
                  args=(lost_key_id,)) + '?hash=' + auth_hash
    # todo: RecoverTypeField?
    # return client.put(url, data={'public_key': public_key,
    #                              'recover_type': RecoverTypeField.REBUILD})
    return client.put(url, data={'public_key': public_key,
                                 'recover_type': None})


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
    url = reverse('lost_keys-detail',
                  args=(lost_key_id,)) + '?hash=' + auth_hash
    # todo: RecoverTypeField?
    # return client.put(url, data={'public_key': public_key,
    #                              'recover_type': RecoverTypeField.DISABLE})
    return client.put(url, data={'public_key': public_key,
                                 'recover_type': None})


def retrieve_lost_key_api_call(lost_key_id, auth_hash=None):
    """
    Call to retrieve view
    :param lost_key_id: int
    :param auth_hash: str
    :return: Response
    """
    client = VaultierAPIClient()
    url = reverse('lost_keys-detail',
                  args=(lost_key_id,)) + '?hash=' + auth_hash
    return client.get(url)
