import urlparse
from django.template import Context
from ..sender import VaultierEmailSender
from django.conf import settings


class InvitationEmailSender(VaultierEmailSender):
    TEMPLATE_NAME = 'mailer/invitation/invitation'
    SUBJECT = '[Vaultier] You have been invited'
    URL_TEMPLATE = '#/invitations/use/{member}/{hash}/'

    def build_context(self):
        return Context({
            'SITE_URL': settings.SITE_URL,
            'url': self.build_url()
        })

    def build_to(self):
        return [self.instance.invitation_email]

    def build_url(self):
        return urlparse.urljoin(settings.SITE_URL, self.URL_TEMPLATE) \
            .replace('{member}', str(self.instance.id)) \
            .replace('{hash}', str(self.instance.invitation_hash))