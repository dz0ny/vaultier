from django.db import models
from django.db.models import Manager, Q, CASCADE, PROTECT
from modelext.tree.iterator import TreeIterableModelMixin
from vaultier.models.acl.fields import AclLevelField
from modelext.softdelete.softdelete import SoftDeleteManagerMixin, SoftDeleteMixin
from modelext.changes.changes import ChangesMixin
from vaultier.models.vault.tree import VaultTreeIterator


class VaultManager(SoftDeleteManagerMixin, Manager):

    def get_queryset(self):
        queryset = super(VaultManager, self).get_queryset()
        return queryset.filter(
            workspace__deleted_at=None,
        )

    def search(self, user, query, max_results=5):
        list = query.split()
        result = self.all_for_user(user).filter(
            Q(reduce(lambda x, y: x | y, [Q(name__icontains=word) for word in list])) |
            Q(reduce(lambda x, y: x | y, [Q(description__icontains=word) for word in list]))
        ).order_by('updated_at')

        return result[:max_results]

        #return self.all_for_user(user).filter(
        #    Q(name__icontains=query) |
        #    Q(description__icontains=query)
        #)

    def all_for_user(self, user):
        vaults = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return vaults


class Vault(SoftDeleteMixin, ChangesMixin, TreeIterableModelMixin,  models.Model):
    class Meta:
        db_table = u'vaultier_vault'
        app_label = 'vaultier'

    tree_iterator_class=VaultTreeIterator

    objects = VaultManager()

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    workspace = models.ForeignKey('vaultier.Workspace', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
