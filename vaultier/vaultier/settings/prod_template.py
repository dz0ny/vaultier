from base import *

RAVEN_CONFIG = {
    'dsn': ''
}

ALLOWED_HOSTS = [
    '$(DOMAIN)',
]

FT_FEATURES.update({
    'raven_key': ''
})

SECRET_KEY = '$(SECRET_KEY)'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.$(DB_TYPE)', # Add  'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'vaultier', # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'vaultier',
        'PASSWORD': 'vaultier',
        'HOST': '127.0.0.1',  # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '',  # Set to empty string for default.
    }
}

# url of site used in emailing, templates and so.
SITE_URL = 'http://$(DOMAIN)/'

COMPRESS_ENABLED = 1

# Email configuration
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False
