import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import BK_FEATURES, SITE_URL


class InvitationEmailSender(VaultierEmailSender):
    TEMPLATE_NAME = 'mailer/invitation/invitation'
    SUBJECT = '[Vaultier] You have been invited'
    URL_TEMPLATE = '#/invitations/use/{member}/{hash}/'

    def build_context(self):
        return Context({
            'SITE_URL': SITE_URL,
            'url': self.build_url()
        })

    def build_to(self):
        return [self.instance.invitation_email]

    def build_url(self):
        return urlparse.urljoin(SITE_URL, self.URL_TEMPLATE) \
            .replace('{member}', str(self.instance.id)) \
            .replace('{hash}', str(self.instance.invitation_hash))