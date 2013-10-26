from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.manager import Manager
from core.models.acl_fields import AclLevelField, AclDirectionField


class AclManager(Manager):
    def materialize_user(self, user):
        pass

    def materialize_role(self, role):
        pass


class Acl(models.Model):
    objects = AclManager()

    class Meta:
        db_table = u'vaultier_acl'
        app_label = 'core'

    level = AclLevelField()
    direction = AclDirectionField()
    role = models.ForeignKey('core.Role', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE)
    to_workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('core.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('core.Card', on_delete=CASCADE, null=True, blank=True)


