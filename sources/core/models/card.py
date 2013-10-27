from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from core.models.acl_fields import AclLevelField
from django.db.models import F, Q

class CardManager(Manager):
    def all_acls(self, user):
        return self.filter(
            Q(acl__level=AclLevelField.LEVEL_READ) | Q(acl__level=AclLevelField.LEVEL_WRITE),
            Q(acl__user=user),
            Q(acl__to_card=F('id'))
        )


class Card(models.Model):
    class Meta:
        app_label = 'core'
        db_table = u'vaultier_card'

    objects = CardManager()

    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    vault = models.ForeignKey('core.Vault', on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
