from django.db import models
from django.db.models import Manager
from modelext.version.model import VersionMixin


class VersionManager(Manager):
    pass

class Version(VersionMixin, models.Model):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_version'

    objects = VersionManager()

