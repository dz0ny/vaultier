import sys

if len(sys.argv) >= 2 and sys.argv[1] == 'test':

    # This is a bit hacky, see
    # http://code.djangoproject.com/ticket/7835

    from django.db import models
    from vaultier.utils.lib.changes.changes import ChangesMixin

    class Garage(ChangesMixin, models.Model):
        class Meta:
            db_table = u'garage'

        car1 = models.CharField(max_length=255, default='')
        car2 = models.CharField(max_length=255, default='')
