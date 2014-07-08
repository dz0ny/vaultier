import urlparse
from django.template import Context
from vaultier.mailer.sender import VaultierEmailSender
from app.settings import BK_FEATURES, SITE_URL


class InvitationEmailSender(VaultierEmailSender):

    def get_raw_recipients(self):
        return {
            'to': '',
            'from_email': BK_FEATURES.get('info_email'),
            'subject': '[Vaultier] You have been invited',
        }

    def build_context(self, data):
        url = urlparse.urljoin(SITE_URL, BK_FEATURES.get('invitation_url_template'))
        url = url.replace('{member}', str(data.id))
        url = url.replace('{hash}', str(data.invitation_hash))

        context = Context({
            'SITE_URL': SITE_URL,
            'url': url
        })

        return context