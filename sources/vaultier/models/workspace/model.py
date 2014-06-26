from itertools import imap
from django.db import models
from django.db.models.deletion import PROTECT
from django.db.models.manager import Manager
from django.db.models.query import QuerySet
from modelext.softdelete.softdelete import SoftDeleteManagerMixin, SoftDeleteMixin
from modelext.tree.iterator import TreeIterableModelMixin
from vaultier.models.acl.fields import AclLevelField
from vaultier.models.member.fields import MemberStatusField
from vaultier.models.member.model import Member
from vaultier.models.role.fields import RoleLevelField
from vaultier.models.role.model import Role
from modelext.changes.changes import ChangesMixin
from vaultier.models.workspace.tree import WorkspaceTreeIterator


class WorkspaceManager(SoftDeleteManagerMixin, Manager):
    def all_for_user(self, user):
        workspaces = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return workspaces

    @classmethod
    def serialize_recoverability(cls, workspaces):
        """
        For a given queryset return an iterable of objects
        containing the workspace name and if it is recoverable
        A workspace is recoverable if it is share among any user
        and its membership status is MemberStatusField.STATUS_MEMBER
        :param workspaces:
        :return: iterable
        """
        assert isinstance(workspaces, QuerySet)
        return imap(lambda workspace: {
            'id' : workspace.id,
            'workspace_name': workspace.name,
            'is_recoverable': Member.objects.filter(workspace_id=workspace.id,
                                                    status=MemberStatusField.STATUS_MEMBER).count() > 1},
                    workspaces)

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


class Workspace(ChangesMixin, SoftDeleteMixin, TreeIterableModelMixin, models.Model):
    class Meta:
        db_table = u'vaultier_workspace'
        app_label = 'vaultier'

    tree_iterator_class = WorkspaceTreeIterator

    objects = WorkspaceManager()

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        created = self.id == None
        super(Workspace, self).save(*args, **kwargs)
        if created:
            Workspace.objects.create_member_with_workspace(self)
