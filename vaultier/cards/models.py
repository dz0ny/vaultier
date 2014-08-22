from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from cards.business.managers import CardManager
from cards.business.tree import CardTreeIterator
from libs.softdelete.softdelete import SoftDeleteMixin
from libs.tree.iterator import TreeIterableModelMixin
from libs.changes.changes import ChangesMixin


class Card(SoftDeleteMixin, ChangesMixin, TreeIterableModelMixin,
           models.Model):

    objects = CardManager()

    tree_iterator_class = CardTreeIterator

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    vault = models.ForeignKey('vaults.Vault', on_delete=CASCADE)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = u'vaultier_card'
