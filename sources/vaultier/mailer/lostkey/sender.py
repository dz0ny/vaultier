import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import BK_FEATURES, SITE_URL


class LostKeyEmailSender(VaultierEmailSender):
    def get_raw_recipients(self):
        return {
            'to': '',
            'from_email': BK_FEATURES.get('info_email'),
            'subject': '[Vaultier] lost key request',
        }

    def build_context(self, data):
        url_template = BK_FEATURES.get('lostkey_url_template').replace('{hash}', data.hash)
        url_template = url_template.replace('{id}', str(data.id))
        site_url = SITE_URL
        url = urlparse.urljoin(site_url, url_template)
        return Context({'url': url})