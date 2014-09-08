#!/usr/bin/env python
import argparse
from django.utils.crypto import get_random_string
import shutil


def _import_settings(settings):
    settings = settings or 'vaultier_settings'

    print settings
    # __import__('vaultier_settings')


def _create_config(settings):
    """
    Creates the configuration file with some sensible defaults and asks the
    user for the most important things
    """
    print "Creating configuration file"

    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    secret_key = get_random_string(50, chars)

    import vaultier.settings.prod_template
    src = vaultier.settings.prod_template.__file__.rstrip('c')
    shutil.copyfile(src, './vaultier_settings.py')

    # Input domain
    domain = raw_input(">>> Please enter the domain where your project is "
                       "going to reside. "
                       "[example: vaultier.mydomain.com]: ")
    if not domain:
        domain = "www.example.com"

    def db_choice():
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
        return int(t)

    db_type = None
    while True:
        db_type = db_choice()
        if db_type:
            break

    with open('vaultier_settings.py', 'r') as file:
        config = file.read()
    with open('vaultier_settings.py', 'w') as file:
        config = config.replace('$(SECRET_KEY)', secret_key)
        config = config.replace('$(DOMAIN)', domain)

        db_driver = {
            1: 'postgresql_psycopg2',
            2: 'mysql',
            3: 'sqlite3',
            4: 'oracle'
        }[db_type]
        config = config.replace('$(DB_TYPE)', db_driver)

        file.write(config)

    print "Config file has been generated in 'vaultier-settings.py' file. " \
          "Please inspect the file and review your settings. You WILL need " \
          "to supply database connection details, before proceeding with the" \
          " 'check' command."


def _check(settings):
    print "Checking configuration"
    _import_settings(settings)


def _init(settings):
    print "Initializing database"
    _import_settings(settings)


def run(command, settings):
    delegate = {
        'create-config': _create_config,
        'check': _check,
        'init': _init
    }[command]

    delegate(settings)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Vaultier management command")
    parser.add_argument('command', choices=['create-config', 'check', 'init'])
    parser.add_argument('--settings')
    args = parser.parse_args()
    run(args.command, args.settings)