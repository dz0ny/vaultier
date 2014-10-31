from django.core.urlresolvers import reverse

from vaultier.test.tools import VaultierAPIClient


def accept_invitation_api_call(token, id=None, hash=None):
    url = reverse('invitation-detail', args=(hash,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.put(url)
    return response


def retrieve_invitation_api_call(token, member, hash):
    url = reverse('invitation-detail', args=(hash,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response
