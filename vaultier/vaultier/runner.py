import sys
from django.utils.crypto import get_random_string
from logan.runner import run_app


CONFIG_TEMPLATE = '''"""\nVaultier configuration file\n"""\n
from vaultier.settings.prod import *

RAVEN_CONFIG = {
    'dsn': ''
}

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
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
SITE_URL = 'https://$(DOMAIN)/'

# Email configuration
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False
'''


def _db_choice():
    """
    Database choice helper method
    """
    t = raw_input(">>> Please enter database type (1 - posgresql, "
                  "2 - mysql, 3 - sqlite, 4 - oracle). [example: 1]: ")
    try:
        t = int(t)
    except ValueError:
        return None
    if t not in [x for x in xrange(1, 5)]:
        return None
    db_driver = {
        1: 'postgresql_psycopg2',
        2: 'mysql',
        3: 'sqlite3',
        4: 'oracle'
    }[t]

    return db_driver


def _generate_settings():
    """
    Generate the settings from template
    """

    # Generate scret key
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    secret_key = get_random_string(50, chars)

    # Fetch DB type
    db_type = None
    while True:
        db_type = _db_choice()
        if db_type:
            break

    # Input domain
    domain = raw_input(">>> Please enter the domain where your project is "
                       "going to reside. "
                       "[example: vaultier.mydomain.com]: ")
    if not domain:
        domain = "www.example.com"

    return CONFIG_TEMPLATE.replace('$(SECRET_KEY)', secret_key). \
        replace('$(DB_TYPE)', str(db_type)).replace('$(DOMAIN)', domain)


def main():
    run_app(
        project='vaultier',
        default_config_path='vaultier.conf.py',
        default_settings='vaultier.settings.prod',
        settings_initializer=_generate_settings,
        settings_envvar='VAULTIER_CONF'
    )


# Execute if run from console
if __name__ == '__main__':
    main()