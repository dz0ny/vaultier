from django.core.mail.backends.smtp import EmailBackend
from django.conf import settings


class VaultierEmailBackend(EmailBackend):
    def send_messages(self, email_messages):
        if settings.BK_FEATURES.get('dev_mail_to'):
            for email_message in email_messages:
                email_message.to = [settings.BK_FEATURES.get('dev_mail_to')]

        return super(VaultierEmailBackend, self).send_messages(email_messages)