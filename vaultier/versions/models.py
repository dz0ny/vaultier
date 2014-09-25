from django.db import models
from django.db.models.deletion import PROTECT
from libs.version.model import VersionMixin


class Version(VersionMixin, models.Model):

    class Meta:
        db_table = u'vaultier_version'
