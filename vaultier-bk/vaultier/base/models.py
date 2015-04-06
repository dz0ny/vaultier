import sys

if len(sys.argv) >= 2 and sys.argv[1] == 'test':

    # This is a bit hacky, see
    # http://code.djangoproject.com/ticket/7835

    from vaultier.base.utils.changes.models import Garage