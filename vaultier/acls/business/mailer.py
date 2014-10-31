import urlparse
from vaultier.business.mailer import VaultierMailer
from django.conf import settings


class GrantedAccessMailer(VaultierMailer):
    """
    Sends an email when the user has granted access to a any
    workspace,vault ot card
    """

    _template = 'mailer/granted_access'

    def format_subject(self):
        """
        Return mail subject

        :return:
        """
        return '[Vaultier] You have been granted access to {}'.format(
            self.object.__class__.__name__.lower()
        )

    def send(self, **kwargs):
        """
        Get the right email to which the email will be send

        :return: list
        """
        if hasattr(self.object, 'member'):
            self.add_to(self.object.member.user.email)
        elif hasattr(self.object, 'membership'):
            self.add_to(self.object.created_by.email)
        return super(GrantedAccessMailer, self).send(**kwargs)

    def _build_context(self, **kwargs):
        """
        Adds extra variables to template Context

        :return: Context
        """

        kwargs.update({
            'type': self.object.__class__.__name__.lower(),
            'SITE_URL': settings.SITE_URL,
            'name': getattr(self.object, 'name'),
            'url': self._build_url()
        })
        return super(GrantedAccessMailer, self)._build_context(**kwargs)

    def _build_url(self):
        """
        Generate frontend url to granted object

        :return: str
        """
        u = urlparse.urljoin(settings.SITE_URL, '/#/')

        m = self.object.__class__.__name__

        if m == 'Workspace':
            return urlparse.urljoin(
                u, 'workspaces/w/{}'.format(self.object.slug)
            ),
        elif m == 'Vault':
            return urlparse.urljoin(
                u, 'workspaces/w/{}/vaults/v/{}'.format(
                    self.object.workspace.slug, self.object.slug)
            ),
        elif m == 'Card':
            return urlparse.urljoin(
                u, '/workspaces/w/{}/vaults/v/{}/cards/c/{}'.format(
                    self.object.vault.workspace.slug, self.object.vault.slug,
                    self.object.slug)
            ),

        return None
