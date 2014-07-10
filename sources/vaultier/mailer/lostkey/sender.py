import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import SITE_URL


class LostKeyEmailSender(VaultierEmailSender):

    SUBJECT = '[Vaultier] lost key request'
    TEMPLATE_NAME = 'mailer/lostkey/lostkey'
    URL_TEMPLATE = '#/lostkey/{id}/{hash}/'

    def build_context(self):
        return Context({'url': self.build_url()})

    def build_to(self):
        return [self.instance.created_by.email]

    def build_url(self):
        url_template = self.URL_TEMPLATE.replace('{hash}', self.instance.hash)
        url_template = url_template.replace('{id}', str(self.instance.id))
        site_url = SITE_URL
        return urlparse.urljoin(site_url, url_template)