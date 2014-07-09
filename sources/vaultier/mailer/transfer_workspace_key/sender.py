import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import BK_FEATURES, SITE_URL


class WorkspaceKeyTransferEmailSender(VaultierEmailSender):

    def get_raw_recipients(self):
        return {
            'to': '',
            'from_email': BK_FEATURES.get('info_email'),
            'subject': '[Vaultier] You can access the workspace: {workspace}',
        }

    def send(self, recipients, template, context):
        recipients['subject'] = recipients.get('subject')\
            .replace('{workspace}', context.workspace.name)
        super(WorkspaceKeyTransferEmailSender, self).send(recipients, template, context)

    def build_context(self, data):
        url = urlparse.urljoin(SITE_URL, BK_FEATURES.get('workspace_url_template'))
        url = url.replace('{workspace_slug}', data.workspace.slug)

        context = Context({
            'granted_workspace': data.workspace.name,
            'url': url,
        })

        return context