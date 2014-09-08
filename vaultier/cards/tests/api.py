from django.core.urlresolvers import reverse
from vaultier.test.tools import VaultierAPIClient


def create_card_api_call(token, **kwargs):
    url = reverse('card-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, kwargs)
    return response


def delete_card_api_call(token, id):
    url = reverse('card-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response


def update_card_api_call(token, pk, **kwargs):
    url = reverse('card-detail', args=(pk,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.patch(url, data=kwargs)
    return response


def retrieve_card_api_call(token, pk):
    url = reverse('card-detail', args=(pk,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.get(url)
    return response


def list_cards_api_call(token, vault=None):
    url = reverse('card-list')
    client = VaultierAPIClient()
    client.token(token)

    data = {}
    if vault:
        data['vault'] = vault

    response = client.get(url, **data)
    return response
