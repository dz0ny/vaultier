from django.db import models
from django.db.models import CASCADE, PROTECT
from libs.tree.iterator import TreeIterableModelMixin
from libs.softdelete.softdelete import SoftDeleteMixin
from libs.changes.changes import ChangesMixin
from vaults.business.managers import VaultManager
from vaults.business.tree import VaultTreeIterator


class Vault(SoftDeleteMixin, ChangesMixin, TreeIterableModelMixin,
            models.Model):

    name = models.CharField(max_length=255)
    color = models.CharField(max_length=30, default='blue')
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    workspace = models.ForeignKey('workspaces.Workspace', on_delete=CASCADE)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    tree_iterator_class = VaultTreeIterator
    objects = VaultManager()

    class Meta:
        db_table = u'vaultier_vault'
