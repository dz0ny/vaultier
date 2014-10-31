from base import *  # noqa

DEBUG = True
TEMPLATE_DEBUG = DEBUG

# Email address to allow send_mail() method
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

VAULTIER.update({
    # for all users same private key is used
    'dev_shared_key': True,
    # Token is available to copy/paste in user profile box
    'dev_show_token': True,
    # current developer email used for default logging when developing
    'dev_email': '',
    # all emails goes to only this use
    'dev_mail_to': '',
    # 1 hour in milliseconds, used to calculate the expiration date
    # of a lostkey resource
    'lostkey_hash_expiration_time': 3600000,
    # Default email address from which we send emails
    'from_email': 'info@localhost',
    # Max difference between timestamp from server and from front-end
    # (in seconds)
    'login_safe_timestamp': 15,
})

SECRET_KEY = 'DEV_KEY_DEV_KEY_DEV_KEY_DEV_KEY_'
