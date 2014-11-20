from optparse import make_option
from vaultier.tasks import task_statistics_collector
from django.core import management
from django.core.management import BaseCommand
from django.db import OperationalError
from django.core.cache import cache
from django.db.utils import ProgrammingError


class Command(BaseCommand):
    option_list = BaseCommand.option_list + (
        make_option('--no_statistics',
                    action='store_true',
                    dest='no_statistics',
                    default=False,
                    help='disable statistics'),
    )

    def handle(self, *args, **options):
        print ">>> Initializing your database"
        try:
            management.call_command('syncdb')
            management.call_command('migrate')
            try:
                # do we need cache table?
                cache.get('', None)
            except ProgrammingError:
                # yes we do
                management.call_command('createcachetable', 'vaultier_cache')

            # public static files
            management.call_command('collectstatic', interactive=False)
        except OperationalError as e:
            msg = ">>> Your DB is not configured correctly: {}"
            print msg.format(e.message)
        else:
            if options.get('no_statistics'):
                task_statistics_collector.delay()
            print (">>> DB is initialized, you can now try to run Vaultier "
                   "using 'vaultier runserver'")
