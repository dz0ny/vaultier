from django.utils.crypto import get_random_string
from logan.runner import run_app
import sys


CONFIG_TEMPLATE = '''"""\nVaultier configuration file\n"""\n
from vaultier.settings.prod import *
import os

RAVEN_CONFIG = {
    'dsn': ''
}

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '$(DOMAIN)',
]

VAULTIER.update({
    'raven_key': '',
    'registration_allow': False,
    'allow_anonymous_usage_statistics': True,
    'from_email': 'noreply@$(DOMAIN)',
})

CONFIG_DIR = os.path.abspath(os.path.dirname(__file__))
MEDIA_ROOT = os.path.join(CONFIG_DIR, 'data')


SECRET_KEY = '$(SECRET_KEY)'

DATABASES = {
    'default': {
        # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'ENGINE': 'django.db.backends.$(DB_TYPE)',
        'NAME': 'vaultier', # Or path to database file if using sqlite3.
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
SITE_URL = 'https://$(DOMAIN)/'

# Email configuration
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False
'''

_managed = False


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
    if not _managed:
        while True:
            db_type = _db_choice()
            if db_type:
                break
    else:
        db_type = 'postgresql_psycopg2'

    # Input domain
    domain = None
    if not _managed:
        domain = raw_input(
            ">>> Please enter the domain where your project is going to "
            "reside. [example: vaultier.mydomain.com]: "
        )
    if not domain:
        domain = "www.example.com"

    cfg = CONFIG_TEMPLATE.replace('$(SECRET_KEY)', secret_key). \
        replace('$(DB_TYPE)', str(db_type))

    if _managed:
        # Update application settings
        cfg = cfg.replace(
            "'from_email': 'noreply@$(DOMAIN)'",
            "'from_email': os.getenv('VAULTIER_FROM_EMAIL', "
            "'noreply@{}')".format(domain),
        )
        cfg = cfg.replace(
            "'registration_allow': False",
            "'registration_allow': bool(os.getenv("
            "'VAULTIER_ALLOW_REGISTRATION', False))",
        )
        cfg = cfg.replace(
            "'allow_anonymous_usage_statistics': True",
            "'allow_anonymous_usage_statistics': bool(os.getenv("
            "'VAULTIER_ALLOW_STATISTICS', True))",
        )
        # Update allowed hosts
        cfg = cfg.replace(
            '\'$(DOMAIN)\'',
            "os.getenv('VAULTIER_DOMAIN', 'www.example.com')",
            1
        )
        # Update site url
        cfg = cfg.replace(
            '$(DOMAIN)',
            "' + os.getenv('VAULTIER_DOMAIN', 'www.example.com') + '"
        )

        # Update database settings
        cfg = cfg.replace(
            "'NAME': 'vaultier'",
            "'NAME': os.getenv('VAULTIER_DATABASE_NAME', 'vaultier')")
        cfg = cfg.replace(
            "'USER': 'vaultier'",
            "'USER': os.getenv('VAULTIER_DATABASE_USER', 'vaultier')")
        cfg = cfg.replace(
            "'PASSWORD': 'vaultier'",
            "'PASSWORD': os.getenv('VAULTIER_DATABASE_PASSWORD', 'vaultier')")
        cfg = cfg.replace(
            "'HOST': '127.0.0.1'",
            "'HOST': os.getenv('VAULTIER_DATABASE_HOST', '127.0.0.1')")
        cfg = cfg.replace(
            "'PORT': ''",
            "'PORT': os.getenv('VAULTIER_DATABASE_PORT', '')")


        # Update email settings
        cfg = cfg.replace(
            "EMAIL_HOST = 'localhost'",
            "EMAIL_HOST = os.getenv('VAULTIER_EMAIL_HOST', '')")
        cfg = cfg.replace(
            "EMAIL_PORT = 25",
            "EMAIL_PORT = os.getenv('VAULTIER_EMAIL_PORT', 25)")
        cfg = cfg.replace(
            "EMAIL_HOST_USER = ''",
            "EMAIL_HOST_USER = os.getenv('VAULTIER_EMAIL_USER', '')")
        cfg = cfg.replace(
            "EMAIL_HOST_PASSWORD = ''",
            "EMAIL_HOST_PASSWORD = os.getenv('VAULTIER_EMAIL_PASSWORD', '')")
        cfg = cfg.replace(
            "EMAIL_USE_TLS = False",
            "EMAIL_USE_TLS = bool(os.getenv('VAULTIER_EMAIL_TLS', False))")

        return cfg
    else:
        return cfg.replace('$(DOMAIN)', domain)


def main():
    # Automatically managed install, we need to circumvent logan a bit
    global _managed
    _managed = '--managed' in sys.argv
    if _managed:
        sys.argv.pop(sys.argv.index('--managed'))

    run_app(
        project='vaultier',
        default_config_path='vaultier_conf.py',
        default_settings='vaultier.settings.prod',
        settings_initializer=_generate_settings,
        settings_envvar='VAULTIER_CONF'
    )


# Execute if run from console
if __name__ == '__main__':
    main()
