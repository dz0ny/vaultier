from settings_base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'vaultier',  # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': '',  # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '',  # Set to empty string for default.
    }
}

# Indicates options for frontend
FT_FEATURES = {
    'dev_shared_key': True,  # for all users same private key is used
    'dev_show_token': True,  # Token is available to copy/paste in user profile box
}

# Indicates options for backend
BK_FEATURES = {
    'dev_mail_to': 'jan.misek@rclick.cz',  # all emails goes to only this user
    'dev_shared_key': True,  # for all users same private key is used
    'lostkey_hash_expiration_time': 600000,  # 10 minutes in milliseconds
    'lostkey_url_template': r'#/lostkey/{id}/{hash}',
    'ga_create_code': None # code for google analytics, on devel we don't want to track anything

}