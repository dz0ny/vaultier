from base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG

# Email address to allow send_mail() method
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Indicates options for frontend
FT_FEATURES = {
    'dev_shared_key': True,  # for all users same private key is used
    'dev_show_token': True,  # Token is available to copy/paste in user profile box
    'dev_email': '',  # current developer email used for default logging when developing
}

# Indicates options for backend
BK_FEATURES = {
    'dev_mail_to': '',  # all emails goes to only this use
    'dev_shared_key': True,  # for all users same private key is used
    # 1 hour in milliseconds, used to calculate the expiration date of a lostkey resource
    'lostkey_hash_expiration_time': 3600000,
    'from_email': 'info@rclick.com',  # Default email address from which we send emails
    'login_safe_timestamp_delta': timedelta(seconds=15),  # Max difference between timestamp from server and from front-end in seconds

}
