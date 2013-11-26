from django.core.mail.backends.smtp import EmailBackend
from app.settings import BK_FEATURES


class VaultierEmailBackend(EmailBackend):
    def send_messages(self, email_messages):
        if BK_FEATURES.get('dev_mail_to'):
            for email_message in email_messages:
                email_message.to=[BK_FEATURES.get('dev_mail_to')]

        return super(VaultierEmailBackend, self).send_messages(email_messages)