import urlparse
from django.conf import settings
from vaultier.business.mailer import VaultierMailer


class LostKeyMailer(VaultierMailer):
    """
    Custom VaultierMailer implementation for LostKey case
    """
    subject = '[Vaultier] lost key request'
    _template = 'mailer/lostkey'

    def _build_context(self, **kwargs):
        """
        Adds extra variable to template Context

        :return: Context
        """
        kwargs.update({'url': self._build_url()})
        return super(LostKeyMailer, self)._build_context(**kwargs)

    def send(self, **kwargs):
        """
        Adds lost key recipient

        :param kwargs:
        :return:
        """
        if self.object:
            self.add_to(self.object.created_by.email)
        return super(LostKeyMailer, self).send(**kwargs)

    def _build_url(self):
        """
        Generate frontend url to lost key page

        :return:
        """
        return urlparse.urljoin(
            settings.SITE_URL,
            '#/lostkey/{}/{}/'.format(self.object.id, self.object.hash)
        )
