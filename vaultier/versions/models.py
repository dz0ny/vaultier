from django.db import models
from libs.version.model import VersionMixin


class Version(VersionMixin, models.Model):

    class Meta:
        db_table = u'vaultier_version'
