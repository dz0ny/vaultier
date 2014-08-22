from .base import *  # noqa

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'vaultier',  # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'root',
        'PASSWORD': 'secreet',
        'HOST': 'localhost',  # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '5432',  # Set to empty string for default.
    }
}

# Indicates options for frontend
FT_FEATURES = {
    'dev_shared_key': True,  # for all users same private key is used
    'dev_show_token': True,  # Token is available to copy/paste in user profile box
    'dev_email': 'jan.misek@rclick.cz',  # current developer email used for default logging when developing
}

# Indicates options for backend
BK_FEATURES = {
    'dev_mail_to': 'jan.misek@rclick.cz',  # all emails goes to only this user
    'dev_shared_key': True,  # for all users same private key is used
    'ga_create_code': None,  # code for google analytics, on devel we don't want to track anything
    # 1 hour in milliseconds, used to calculate the expiration date of a lostkey resource
    'lostkey_hash_expiration_time': 3600000,
    'from_email': 'info@rclick.com',  # Default email address from which we send emails
    'login_safe_timestamp_delta': 15,  # Max difference between timestamp from server and from front-end in seconds

}
