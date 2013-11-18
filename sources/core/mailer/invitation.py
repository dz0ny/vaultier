from os import path
from django.core.mail.message import EmailMultiAlternatives
from django.template.context import Context
from django.template.loader import get_template
from pynliner import Pynliner
from vaultier.settings import PROJECT_ROOT, EMAIL_BACKEND, SITE_URL
import urlparse

def render_email(template, context=None):
    if not context:
        context = Context({})

    css = 'mailer/layout.css'
    plain = get_template(template + '.txt').render(context)
    html = get_template(template + '.html').render(context)
    css = get_template(css).render(Context({}))

    p = Pynliner()
    html = p.from_string(html).with_cssString(css).run()

    return (plain, html)

def build_context(member):
    url = urlparse.urljoin(SITE_URL, '/#/invitations/use/{member}/{hash}/')
    url = url.replace('{member}', str(member.id))
    url = url.replace('{hash}', str(member.invitation_hash))

    context = Context({
        'SITE_URL': SITE_URL,
        'url': url
    })
    return context

def send_invitation(member):
    template = 'mailer/invitation'
    context = build_context(member)

    to = ['jan.misek@rclick.cz']
    from_email = 'info@rclick.cz'
    subject = 'Invitation'

    plain, html = render_email(template, context=context)

    msg = EmailMultiAlternatives(from_email=from_email, to=to, body=plain, subject=subject)
    msg.attach_alternative(html, 'text/html')

    msg.send(fail_silently=False)

def resend_invitation(member):
    return send_invitation(member)