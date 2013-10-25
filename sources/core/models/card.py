from django.db import models
from django.db.models.deletion import PROTECT, CASCADE

class Card(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    vault = models.ForeignKey('core.Vault', on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'core'
        db_table = u'vaultier_card'
