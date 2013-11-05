from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from django.db.models import F, Q
from core.models.role_fields import RoleLevelField
from core.tools.tree import TreeItemMixin


class VaultManager(Manager):
    def all_acls(self, user):
        return self.filter(
            Q(acl__level=RoleLevelField.LEVEL_READ) | Q(acl__level=RoleLevelField.LEVEL_WRITE),
            Q(acl__user=user),
            Q(acl__to_vault=F('id'))
        )

class Vault(models.Model, TreeItemMixin):
    class Meta:
        db_table = u'vaultier_vault'
        app_label = 'core'

    objects = VaultManager()

    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_parent_object_class(self):
        from core.models.workspace import Workspace
        return Workspace

    def get_parent_object_id(self):
        return self.workspace_id

    def get_parent_object(self):
        return self.workspace