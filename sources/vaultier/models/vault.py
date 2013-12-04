from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from django.db.models import F, Q
from vaultier.models.role_fields import RoleLevelField
from vaultier.models.workspace import Workspace
from vaultier.tools.changes import ChangesMixin
from vaultier.tools.tree import TreeItemMixin


class VaultManager(Manager):
    def all_for_user(self, user):
        vaults = self.filter(
            acl__user=user
        ).distinct()

        return vaults

class Vault(ChangesMixin, models.Model, TreeItemMixin):
    class Meta:
        db_table = u'vaultier_vault'
        app_label = 'vaultier'

    objects = VaultManager()

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    workspace = models.ForeignKey('vaultier.Workspace', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_child_objects(self):
        return self.card_set.all()


    def get_parent_object(self):
        return self.workspace