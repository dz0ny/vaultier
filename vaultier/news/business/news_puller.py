from django.conf import settings
import requests
from django.core.cache import cache
from urlparse import urljoin


class NewsPuller(object):
    """
    NewsPuller service return news list from vaultier.org API if any.
    """
    PREFIX_KEY = '_news'
    ETAG_KEY = '{}-etag'.format(PREFIX_KEY)
    DATA_KEY = '{}-data'.format(PREFIX_KEY)
    _url = None
    _connection_timeout = None
    _cache_timeout = None

    def __init__(self, url, connection_timeout, cache_timeout):
        self._url = url
        self._connection_timeout = connection_timeout
        self._cache_timeout = cache_timeout

    @property
    def etag(self):
        """
        Return etag from cache if any, to be used in request header to
        prevent sending same data

        :return:
        """
        return cache.get(self.ETAG_KEY)

    def _invoke_api(self, count, use_etag=True):
        """
        Invoke vaultier.org website api to get news if any

        :param use_etag:
        :return:
        """
        headers = {'content-type': 'application/json'}
        if use_etag and self.etag:
            headers.update({'If-None-Match': self.etag})

        try:
            url = urljoin(self._url, '?page_size={}'.format(count))
            return requests.get(url, headers=headers,
                                timeout=self._connection_timeout)
        except requests.exceptions.RequestException as e:
            return None

    def _load_from_cache(self):
        """
        Load news from cache if any, otherwise return empty list

        :return: list
        """
        return cache.get(self.DATA_KEY, [])

    def _save(self, data, etag):
        """
        Store acquired data end etag in cache

        :param data:
        :param etag:
        :return:
        """
        cache.set(self.ETAG_KEY, etag, self._cache_timeout)
        cache.set(self.DATA_KEY, data, self._cache_timeout)

    def fetch(self, count=3):
        """
        Fetch data from vaultier.org API or cache if nothing changed

        :param count: int
        :return: list
        """

        data = self._load_from_cache()
        if data:
            return data

        response = self._invoke_api(count)
        if response and response.status_code == 200:
            data = response.json()
            etag = response.headers['ETag']
            self._save(data, etag)
        return data


puller = NewsPuller(settings.VAULTIER.get('news_url'),
                    settings.VAULTIER.get('news_connection_timeout'),
                    settings.VAULTIER.get('news_cache_timeout'))
