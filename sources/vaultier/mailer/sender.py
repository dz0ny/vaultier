from django.core.mail.message import EmailMultiAlternatives
from django.template.context import Context
from django.template.loader import get_template
from pynliner import Pynliner


class VaultierEmailSender(object):
    """
    Abstract class. Sends a email
    """
    template_style = 'mailer/layout.css'

    def send(self, recipients, template, context):
        """
        Send an email, base on the template and context given to the address in recipients.
        :param recipients: dict {'from_email': str, 'to': str, 'subject': str}
        :param template: str path to the template file without the extension
        :param context:
        :return: None
        """
        context = self.build_context(context)
        plain, html = self.render_email(template, context=context)
        msg = EmailMultiAlternatives(from_email=recipients.get('from_email'), to=recipients.get('to'), body=plain,
                                     subject=recipients.get('subject'))
        msg.attach_alternative(html, 'text/html')
        msg.send(fail_silently=False)


    def render_email(self, template, context):
        """
        Renders the plain and html versions of a template.
        Return both in a tuple, where the first element is the plain text version
        and the second element is the html version
        :param template: str path to the template files without the extension
        :param context: django.template.context.Context
        :return: (str, str,)
        """
        if not context:
            context = Context({})

        plain = get_template(template + '.txt').render(context)
        html = get_template(template + '.html').render(context)
        css = get_template(self.template_style).render(Context({}))

        p = Pynliner()
        html = p.from_string(html).with_cssString(css).run()

        return plain, html

    def build_context(self, data):
        """
        Must return an instance of django.template.context.Context
        with the template variables set for each implementation
        :param data:
        :return:
        """
        raise NotImplemented

    def get_raw_recipients(self):
        """
        Must be implemented on each class.
        Returns the custom recipient dict for each implementation
        :return:
        """
        raise NotImplementedError