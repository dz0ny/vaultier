from django.core import management
from django.core.management import BaseCommand
from django.db import OperationalError


class Command(BaseCommand):

    def handle(self, *args, **options):
        print ">>> Initializing your database"
        try:
            management.call_command('syncdb')
            management.call_command('migrate')
            management.call_command('collectstatic', interactive=False)
        except OperationalError as e:
            msg = ">>> Your DB is not configured correctly: {}"
            print msg.format(e.message)
        else:
            print ">>> DB is initialized, you can now try to run Vaultier " \
                  "using 'vaultier runserver'"