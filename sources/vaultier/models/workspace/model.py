from django.contrib.contenttypes.generic import GenericRelation
from django.db import models
from django.db.models.deletion import PROTECT
from django.db.models.manager import Manager
from modelext.softdelete.softdelete import SoftDeleteManagerMixin, SoftDeleteMixin
from modelext.tree.iterator import TreeIterableModelMixin
from vaultier.models.acl.fields import AclLevelField
from vaultier.models.member.fields import MemberStatusField

from vaultier.models.member.model import Member
from vaultier.models.role.fields import RoleLevelField
from vaultier.models.role.model import Role
from modelext.changes.changes import ChangesMixin
from vaultier.models.tree import TreeItemMixin
from vaultier.models.workspace.treeperms import WorkspaceTreeIterator


class WorkspaceManager(SoftDeleteManagerMixin, Manager):

    def all_for_user(self, user):
        workspaces = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return workspaces

    def create_member_with_workspace(self, workspace):
        attrs_needed = ['_user', ]
        if not all(hasattr(workspace, attr) for attr in attrs_needed):
            raise AttributeError('_user attribute is required to create related membership')

        m = Member(
            workspace=workspace,
            user=workspace._user,
            status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY,
            created_by=workspace._user
        )
        m.save()

        r = Role(
            member=m,
            to_workspace=workspace,
            created_by=workspace._user,
            level=RoleLevelField.LEVEL_WRITE
        )
        r.save()


class Workspace(ChangesMixin, SoftDeleteMixin, TreeIterableModelMixin,  models.Model):
    class Meta:
        db_table = u'vaultier_workspace'
        app_label = 'vaultier'

    tree_iterator_class=WorkspaceTreeIterator

    objects = WorkspaceManager()

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    acl = GenericRelation('vaultier.Acl',
        content_type_field='object_type',
        object_id_field='object_id'
    );

    def __unicode__(self):
        return 'Workspace('+str(self.id)+'):'+self.name

    def save(self, *args, **kwargs):
        created = self.id == None
        super(Workspace, self).save(*args, **kwargs)
        if created:
            Workspace.objects.create_member_with_workspace(self)
