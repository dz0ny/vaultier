from django.db import models
from libs.changes.changes import ChangesMixin


class Garage(ChangesMixin, models.Model):
    class Meta:
        db_table = u'garage'

    car1 = models.CharField(max_length=255, default='')
    car2 = models.CharField(max_length=255, default='')
