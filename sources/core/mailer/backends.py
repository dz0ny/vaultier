from django.core.mail.backends.smtp import EmailBackend

class DevelopmentEmailBackend(EmailBackend):
    def send_messages(self, email_messages):
        for email_message in email_messages:
            email_message.to=['jan.misek@rclick.cz']

        return super(DevelopmentEmailBackend, self).send_messages(email_messages)