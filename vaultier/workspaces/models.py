from django.db import models
from libs.changes.changes import ChangesMixin
from libs.softdelete.softdelete import SoftDeleteMixin
from libs.tree.iterator import TreeIterableModelMixin
from django.db.models.deletion import PROTECT
from .business.tree import WorkspaceTreeIterator
from .business.managers import WorkspaceManager


class Workspace(ChangesMixin, SoftDeleteMixin, TreeIterableModelMixin,
                models.Model):
    tree_iterator_class = WorkspaceTreeIterator

    name = models.CharField(max_length=255)

    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = WorkspaceManager()

    class Meta:
        db_table = u'vaultier_workspace'

    def __str__(self):
        return self.name

    def __unicode__(self):
        return unicode(str(self))

    def save(self, *args, **kwargs):
        super(Workspace, self).save(*args, **kwargs)
        if kwargs.get('force_insert', False):
            Workspace.objects.create_member_with_workspace(self)
