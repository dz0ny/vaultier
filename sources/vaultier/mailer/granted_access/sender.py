import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import SITE_URL, BK_FEATURES


class GrantedAccessEmailSender(VaultierEmailSender):
    """
    Sends an email when the user has granted access to a any workspace
    """

    def get_raw_recipients(self):
        return {
            'to': '',
            'from_email': BK_FEATURES.get('info_email'),
            'subject': '[Vaultier] You have been granted access to {type}',
        }

    def send(self, recipients, template, context):
        recipients['subject'] = recipients['subject'].replace('{type}', context.__class__.__name__.lower())
        super(GrantedAccessEmailSender, self).send(recipients, template, context.get_object())

    def build_context(self, data):
        url = SITE_URL
        if data.__class__.__name__ == 'Workspace':
            url = urlparse \
                .urljoin(url, '#/workspaces/w/{workspace}') \
                .replace('{workspace}', data.slug)

        if data.__class__.__name__ == 'Vault':
            url = urlparse \
                .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}') \
                .replace('{workspace}', data.workspace.slug) \
                .replace('{vault}', data.slug)

        if data.__class__.__name__ == 'Card':
            url = urlparse \
                .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}/cards/c/{card}') \
                .replace('{workspace}', data.vault.workspace.slug) \
                .replace('{vault}', data.vault.slug) \
                .replace('{card}', data.slug)

        if data.name not in (None, ''):
            name = data.name
        else:
            name = None

        context = Context({
            'type': data.__class__.__name__.lower(),
            'SITE_URL': SITE_URL,
            'name': name,
            'url': url
        })

        return context
