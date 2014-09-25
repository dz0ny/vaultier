from django.conf import settings
from django.core.mail.message import EmailMultiAlternatives
from django.template.context import Context
from django.template.loader import get_template
from pynliner import Pynliner
from celery.contrib.methods import task_method
from celery import current_app as app


class VaultierEmailer(object):
    """
    Vaultier base mailer class. Feel free to override me
    """

    _to = []
    _template = 'mailer/layout.html'
    from_email = None
    subject = None
    template_style = 'mailer/layout.css'

    def __init__(self, **kwargs):
        self._to = kwargs.get('to', [])
        self.from_email = kwargs.get('from_email',
                                     settings.BK_FEATURES.get('from_email'))
        self.subject = kwargs.get('subject', self.subject)
        self._template = kwargs.get('template', self.template)
        self.template_style = kwargs.get('template_style', self.template_style)

    @property
    def to(self):
        """
        Return list of email recipients
        """
        try:
            return iter(self._to)
        except TypeError:
            return [self._to]

    def add_to(self, value):
        """
        Add recipient
        """
        self._to.append(value)
        return self

    @property
    def template(self):
        """
        Return template name

        :return:
        """
        def plain():
            """
            return Template instance with plaintext template
            """
            return get_template("{}.txt".format(self._template))

        def html():
            """
            return Template instance with html formatted template
            """
            return get_template("{}.html".format(self._template))

        return self._template

    def send(self, **kwargs):
        """
        Send an email, base on the template and context given to the address
        in recipients.
        :return: None
        """
        if kwargs.pop('async', True):
            self._send.delay(**kwargs)
        else:
            self._send(**kwargs)
    @app.task(filter=task_method)
    def _send(self, **kwargs):
        """
        Actually send email in background

        :return:
        """
        context = self.build_context(**kwargs)
        plain, html = self._render(context)
        msg = EmailMultiAlternatives(
            from_email=self.from_email,
            to=self.to,
            body=plain,
            subject=self.subject
        )

        msg.attach_alternative(html, 'text/html')
        msg.send()

    def _render(self, context):
        """
        Renders the plain and html versions of a template.
        Return both in a tuple, where the first element is the plain text version
        and the second element is the html version
        :return: (str, str,)
        """
        if not context:
            context = Context({})

        plain = self.template.plain.render(context)
        html = self.template.html.render(context)
        css = get_template(self.template_style).render(Context({}))

        p = Pynliner()
        html = p.from_string(html).with_cssString(css).run()

        return plain, html

    def build_context(self, **kwargs):
        """
        Must return an instance of django.template.context.Context
        with the template variables set for each implementation
        :return: None
        """

        return Context(**kwargs)

    def build_url(self):
        """
        Must return an url to the related resource
        """
        raise NotImplementedError
