from django.template.context import Context
from vaultier.mailer.invitation import render_email
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import urlparse
import vaultier.models.lostkey.model


def send_lost_key_notification(obj):
    from_email = 'info@rclick.cz'
    subject = '[Vaultier] lost key request'
    assert isinstance(obj, vaultier.models.lostkey.model.LostKey)
    url_template = settings.BK_FEATURES.get('lostkey_url_template').replace('{hash}', obj.hash)
    url_template = url_template.replace('{id}', str(obj.id))
    site_url = settings.SITE_URL
    url = urlparse.urljoin(site_url, url_template)
    context = Context({'url': url})
    plain, html = render_email(template='mailer/lostkey', context=context)
    msg = EmailMultiAlternatives(from_email=from_email, to=[obj.created_by.email], body=plain, subject=subject)
    msg.attach_alternative(html, 'text/html')
    msg.send(fail_silently=False)
