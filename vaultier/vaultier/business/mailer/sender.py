from django.conf import settings
from django.core.mail.message import EmailMultiAlternatives
from django.template.base import Template
from django.template.context import Context
from django.template.loader import get_template
from pynliner import Pynliner


class VaultierEmailSender(object):
    """
    Abstract class. Sends a email
    """
    TEMPLATE_STYLE = 'mailer/layout.css'
    TEMPLATE_NAME = None
    SUBJECT = None
    URL_TEMPLATE = None

    def __init__(self, instance):
        self.instance = instance

    def build_to(self):
        """
        Must return a list with the email of the person or persons
        that we send the email to
        :return:
        """
        raise NotImplementedError

    def build_from_email(self):
        """
        Returns the email address from which we would like to send the email
        :return:
        """
        return settings.BK_FEATURES.get('from_email')

    def send(self):
        """
        Send an email, base on the template and context given to the address in recipients.
        :return: None
        """
        context = self.build_context()
        plain, html = self.render_email(context)
        msg = EmailMultiAlternatives(from_email=self.build_from_email(),
                                     to=self.build_to(),
                                     body=plain,
                                     subject=self.build_subject(context))
        msg.attach_alternative(html, 'text/html')
        msg.send(fail_silently=False)

    def render_email(self, context):
        """
        Renders the plain and html versions of a template.
        Return both in a tuple, where the first element is the plain text version
        and the second element is the html version
        :return: (str, str,)
        """
        if not context:
            context = Context({})

        plain = get_template(self.TEMPLATE_NAME + '.txt').render(context)
        html = get_template(self.TEMPLATE_NAME + '.html').render(context)
        css = get_template(self.TEMPLATE_STYLE).render(Context({}))

        p = Pynliner()
        html = p.from_string(html).with_cssString(css).run()

        return plain, html

    def build_context(self):
        """
        Must return an instance of django.template.context.Context
        with the template variables set for each implementation
        :return: None
        """
        raise NotImplemented

    def build_subject(self, context):
        """
        It should be implemented if the child class subject contains any variable
        By default it returns the instance property SUBJECT
        :return:
        """
        template = Template(self.SUBJECT)
        return template.render(context)

    def build_url(self):
        """
        Must return an url to the related resource
        """
        raise NotImplementedError
