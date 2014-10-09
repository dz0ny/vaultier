from django.core.urlresolvers import reverse
from vaultier.test.tools import VaultierAPIClient


def search_api_call(token, query=None):
    url = reverse('search-search')
    client = VaultierAPIClient()
    client.token(token)

    data = {
        'query': query
    }

    response = client.get(url, data)
    return response
