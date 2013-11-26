from settings_base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'vaultier', # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': '', # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '', # Set to empty string for default.
    }
}


# Indicates options for frontend
FT_FEATURES = {
    'dev_shared_key': True # development features
}

# Indicates options for backed
BK_FEATURES = {
    'dev_mail_to': 'jan.misek@rclick.cz',
    'dev_shared_key':True # development features
}