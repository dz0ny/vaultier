from django.db import models
from django.db.models.deletion import PROTECT
from django.db.models.manager import Manager
from django.db.models.signals import post_save
from core.models.acl_fields import AclLevelField
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.models.role import Role
from django.db.models import F, Q


class WorkspaceManager(Manager):
    def all_acls(self, user):
        return self.filter(
            Q(acl__level=AclLevelField.LEVEL_READ) | Q(acl__level=AclLevelField.LEVEL_WRITE),
            Q(acl__user=user),
            Q(acl__to_workspace=F('id'))
        )

    def create_member_with_workspace(self, workspace):
        attrs_needed = ['_user', ]
        if not all(hasattr(workspace, attr) for attr in attrs_needed):
            raise AttributeError('_user attribute is required to create related membership')

        m = Member(
            workspace=workspace,
            user=workspace._user,
            status=MemberStatusField.STATUS_MEMBER,
            created_by=workspace._user
        )
        m.save()

        r = Role(
            member=m,
            to_workspace=workspace,
            created_by=workspace._user,
            level=AclLevelField.LEVEL_WRITE
        )
        r.save()


class Workspace(models.Model):
    class Meta:
        db_table = u'vaultier_workspace'
        app_label = 'core'

    objects = WorkspaceManager()
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024, blank=True, null=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        created = self.id == None
        super(Workspace, self).save(*args, **kwargs)
        if created:
            Workspace.objects.create_member_with_workspace(self)
