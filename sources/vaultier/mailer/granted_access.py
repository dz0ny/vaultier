from os import path
from django.core.mail.message import EmailMultiAlternatives
from django.template.context import Context
from django.template.loader import get_template
from pynliner import Pynliner
from app.settings import PROJECT_ROOT, EMAIL_BACKEND, SITE_URL
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


def build_context(object):
    url = SITE_URL
    if (object.__class__.__name__ == 'Workspace'):
        url = urlparse \
            .urljoin(url, '#/workspaces/w/{workspace}') \
            .replace('{workspace}', object.slug)

    if (object.__class__.__name__ == 'Vault'):
        url = urlparse \
            .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}') \
            .replace('{workspace}', object.workspace.slug) \
            .replace('{vault}', object.slug)

    if (object.__class__.__name__ == 'Card'):
        url = urlparse \
            .urljoin(url, '#/workspaces/w/{workspace}/vaults/v/{vault}/cards/c/{card}') \
            .replace('{workspace}', object.vault.workspace.slug) \
            .replace('{vault}', object.vault.slug)\
            .replace('{card}', object.slug)

    if object.name not in (None, '' ):
        name = object.name
    else:
        name = None

    context = Context({
        'type': object.__class__.__name__.lower(),
        'SITE_URL': SITE_URL,
        'name' : name,
        'url': url
    })
    return context


def send_granted_access(role):
    template = 'mailer/granted_access'
    context = build_context(role.get_object())

    to = [role.member.user]
    from_email = 'info@rclick.cz'
    subject = '[Vaultier] You have been granted access to {type}'\
        .replace('{type}', context.get('type'))

    plain, html = render_email(template, context=context)

    msg = EmailMultiAlternatives(from_email=from_email, to=to, body=plain, subject=subject)
    msg.attach_alternative(html, 'text/html')

    msg.send(fail_silently=False)

