import urlparse
from django.template import Context
from ..sender import VaultierEmailSender
from django.conf import settings


class WorkspaceKeyTransferEmailSender(VaultierEmailSender):

    TEMPLATE_NAME = 'mailer/transfer_workspace_key/transfer_workspace_key'
    SUBJECT = '[Vaultier] You can access the workspace: {{ granted_workspace }}'
    URL_TEMPLATE = '#/workspaces/w/{workspace_slug}/'

    def build_context(self):
        return Context({
            'granted_workspace': self.instance.workspace.name,
            'url': self.build_url(),
        })

    def build_to(self):
        return [self.instance.user.email]

    def build_url(self):
        return urlparse.urljoin(settings.SITE_URL, self.URL_TEMPLATE) \
            .replace('{workspace_slug}', self.instance.workspace.slug)