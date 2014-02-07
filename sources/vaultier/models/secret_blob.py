from django.db import models
from django.db.models import Manager, PROTECT
from modelext.changes.changes import ChangesMixin


class SecretBlobManager(Manager):
    def all_for_user(self, user):
        from vaultier.models.secret import Secret
        blobs = self.filter(
            secret__in=Secret.objects.all_for_user(user)
        )

        return blobs


class SecretBlob(ChangesMixin, models.Model):
    class Meta:
        db_table = u'vaultier_secret_blob'
        app_label = 'vaultier'

    objects = SecretBlobManager()

    data = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)