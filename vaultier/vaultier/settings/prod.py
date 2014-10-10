from base import *  # noqa

# Sentry site_id
SITE_ID = 1

RAVEN_CONFIG = {
    'dsn': ''
}

ALLOWED_HOSTS = [
    'www.example.com',
]

VAULTIER.update({
    'raven_key': ''
})

SECRET_KEY = ''

DATABASES = {
    'default': {
        # Add  'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # Or path to database file if using sqlite3.
        'NAME': 'vaultier',
        # The following settings are not used with sqlite3:
        'USER': 'vaultier',
        'PASSWORD': 'vaultier',
        # Empty for localhost through domain sockets or '127.0.0.1'
        # for localhost through TCP.
        'HOST': '127.0.0.1',
        'PORT': '',  # Set to empty string for default.
    }
}

# url of site used in emailing, templates and so.
SITE_URL = 'http://www.example.com/'

COMPRESS_ENABLED = 1

# Email configuration
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False
