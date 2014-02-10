from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from django.db.models import Q
from modelext.softdelete.softdelete import SoftDeleteManagerMixin, SoftDeleteMixin
from vaultier.models.acl.fields import AclLevelField
from modelext.changes.changes import ChangesMixin
from vaultier.models.tree import TreeItemMixin


class CardManager(SoftDeleteManagerMixin, Manager):

    def get_queryset(self):
        queryset = super(CardManager, self).get_queryset()
        return queryset.filter(
            vault__workspace__deleted_at=None,
            vault__deleted_at=None,
        )

    def search(self, user, query, max_results=5):
        list = query.split()
        result = self.all_for_user(user).filter(
            Q(reduce(lambda x, y: x | y, [Q(name__icontains=word) for word in list])) |
            Q(reduce(lambda x, y: x | y, [Q(description__icontains=word) for word in list])) |
            Q(reduce(lambda x, y: x | y, [Q(secret__name__icontains=word) for word in list]))
        ).order_by('updated_at')
        return result[:max_results]

    def all_for_user(self, user):
        cards = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return cards


class Card(SoftDeleteMixin, ChangesMixin, models.Model, TreeItemMixin):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_card'

    objects = CardManager()

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    vault = models.ForeignKey('vaultier.Vault', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_child_objects(self):
        return []

    def get_parent_object(self):
        return self.vault
