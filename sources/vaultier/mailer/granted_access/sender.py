import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import SITE_URL


class GrantedAccessEmailSender(VaultierEmailSender):
    """
    Sends an email when the user has granted access to a any workspace
    """
    SUBJECT = '[Vaultier] You have been granted access to {type}'
    TEMPLATE_NAME = 'mailer/granted_access/granted_access'

    def build_subject(self):
        """
        Replace the variable type from with it value
        :return: str
        """
        return self.SUBJECT.replace('{type}', self.instance.__class__.__name__.lower())

    def build_to(self):
        """
        Get the right email to which the email will be send
        :return: list
        """
        if hasattr(self.instance, 'member'):
            return [self.instance.member.user.email]
        elif hasattr(self.instance, 'membership'):
            return [self.instance.created_by.email]

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
            'SITE_URL': SITE_URL,
            'name': name,
            'url': self.build_url()
        })

        return context

    def build_url(self):
        """

        :return: str
        """
        url = SITE_URL
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
                .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}/cards/c/{card}') \
                .replace('{workspace}', self.instance.vault.workspace.slug) \
                .replace('{vault}', self.instance.vault.slug) \
                .replace('{card}', self.instance.slug)

        return url
