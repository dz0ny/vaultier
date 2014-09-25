import urlparse
from django.template import Context
from django.conf import settings
from vaultier.business.mailer import VaultierMailer


class GrantedAccessEmailSender(VaultierMailer):
    """
    Sends an email when the user has granted access to a any workspace
    """
    subject = '[Vaultier] You have been granted access to {}'
    template = 'mailer/granted_access/granted_access'




    def build_context(self):
        """

        :return: Context
        """
        if hasattr(self.instance, 'name'):
            name = self.instance.name
        else:
            name = None

        context = Context({
            'type': self.instance.__class__.__name__.lower(),
            'SITE_URL': settings.SITE_URL,
            'name': name,
            'url': self.build_url()
        })

        return context

    def build_url(self):
        """

        :return: str
        """
        url = settings.SITE_URL
        if self.instance.__class__.__name__ == 'Workspace':
            url = urlparse \
                .urljoin(url, '#/workspaces/w/{workspace}') \
                .replace('{workspace}', self.instance.slug)

        if self.instance.__class__.__name__ == 'Vault':
            url = urlparse \
                .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}') \
                .replace('{workspace}', self.instance.workspace.slug) \
                .replace('{vault}', self.instance.slug)

        if self.instance.__class__.__name__ == 'Card':
            url = urlparse \
                .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}'
                              '/cards/c/{card}') \
                .replace('{workspace}', self.instance.vault.workspace.slug) \
                .replace('{vault}', self.instance.vault.slug) \
                .replace('{card}', self.instance.slug)

        return url
