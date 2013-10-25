from django.db import models
from django.db.models.deletion import PROTECT, CASCADE

class Secret(models.Model):
    type = models.IntegerField(null=False)
    data = models.TextField(null=True)
    card = models.ForeignKey('core.Card', on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = u'vaultier_secret'
        app_label = 'core'

