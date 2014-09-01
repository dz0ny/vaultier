from django.db import models
from accounts.business.fields import MemberStatusField
from accounts.business.managers import MemberManager
from accounts.models import Member
from libs.changes.changes import ChangesMixin
from libs.lowercasefield.lowercasefield import LowerCaseCharField
from libs.softdelete.softdelete import SoftDeleteMixin
from libs.tree.iterator import TreeIterableModelMixin
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.signals import post_save
from .business.tree import WorkspaceTreeIterator
from .business.managers import WorkspaceManager


class Workspace(ChangesMixin, SoftDeleteMixin, TreeIterableModelMixin,
                models.Model):
    tree_iterator_class = WorkspaceTreeIterator

    objects = WorkspaceManager()

    name = models.CharField(max_length=255)

    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = u'vaultier_workspace'

    def save(self, *args, **kwargs):
        # created = self.id is None
        super(Workspace, self).save(*args, **kwargs)
        if kwargs.get('force_insert', False):
            Workspace.objects.create_member_with_workspace(self)
