from email.mime.image import MIMEImage
from os import path
from django.core.mail.message import EmailMultiAlternatives
from django.template.context import Context
from django.template.loader import get_template
import pynliner
from pynliner import Pynliner
from templated_email import get_templated_mail
from vaultier.settings import PROJECT_ROOT, EMAIL_BACKEND


def defaults():

# required
###########################
#template_name='welcome',
#from_email='from@example.com',
#to=['to@example.com'],
#context={
#    'username':request.user.username,
#    'full_name':request.user.get_full_name(),
#    'signup_date':request.user.date_joined
#},

# Optional:
###########################
# cc=['cc@example.com'],
# bcc=['bcc@example.com'],
# headers={'My-Custom-Header':'Custom Value'},
# template_prefix="my_emails/",
# template_suffix="email",

    return {
        'template_dir': path.join(PROJECT_ROOT, 'core/mailer/'),
        'template_suffix': 'email.html',
        'from_email': 'info@rclick.cz',
        'context': {}
    }


def send_invitation(member):
    context = Context({})
    template = 'mailer/invitation'
    css = 'mailer/layout.css'

    to = ['jan.misek@rclick.cz']
    from_email = 'info@rclick.cz'
    subject = 'Test'
    plain = get_template(template + '.txt').render(context)
    html = get_template(template + '.html').render(context)
    css = get_template(css).render(Context({}))

    p = Pynliner()
    html = p.from_string(html).with_cssString(css).run()

    msg = EmailMultiAlternatives(from_email=from_email, to=to, body=plain, subject=subject)
    msg.attach_alternative(html, 'text/html')



    msg.send(fail_silently=False)

#
#def send_invitation(member):
#    options = defaults()
#    options['template_name'] = 'invitation'
#    options['to'] = (member.invitation_email,)
#
#    message = get_templated_mail(**options)
#
#    html, type = message.alternatives.pop(0)
#    html = pynliner.fromString(html)
#    message.attach_alternative(html, 'text/html')
#
#    message.send()
#    return


def resend_invitation(member):
    return send_invitation(member)