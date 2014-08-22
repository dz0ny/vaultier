from base import *

RAVEN_CONFIG = {
    'dsn': 'http://4865dc1aa3e941eaa5f5fe8282e66a5b:628a6f4819264c8fa459e69a8b860b60@sentry.rclick.cz/4'
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'vaultier', # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'vaultier',
        'PASSWORD': 'vaultier',
        'HOST': '127.0.0.1', # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '', # Set to empty string for default.
    }
}

# url of site used in emailing, templates and so.
SITE_URL = 'http://your.site.com/'

COMPRESS_ENABLED = 1
