from django.db import models
from libs.changes.changes import ChangesMixin
from libs.lowercasefield.lowercasefield import LowerCaseCharField
from libs.softdelete.softdelete import SoftDeleteMixin
from libs.tree.iterator import TreeIterableModelMixin
from workspaces.business.fields import MemberStatusField
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.signals import post_save
from .business.tree import WorkspaceTreeIterator
from .business.managers import WorkspaceManager, MemberManager


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


class Member(ChangesMixin, models.Model):

    workspace = models.ForeignKey('workspaces.Workspace',
                                  related_name='membership',
                                  on_delete=CASCADE)

    user = models.ForeignKey('accounts.User', on_delete=CASCADE, null=True,
                             related_name='membership'
                             )
    invitation_hash = models.CharField(max_length=64, null=True, unique=True)
    invitation_email = LowerCaseCharField(max_length=1024, null=True)
    workspace_key = models.CharField(max_length=4096)
    status = MemberStatusField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT,
                                   related_name='members_created'
                                   )
    objects = MemberManager()

    class Meta:
        db_table = u'vaultier_member'

    def is_invitation(self):
        if self.status == MemberStatusField.STATUS_INVITED:
            return True
        return False

    def save(self, *args, **kwargs):
        if not self.invitation_hash:
            self.invitation_hash = Member.objects.generate_invitation_hash()
        return super(Member, self).save(*args, **kwargs)


def register_signals():
    post_save.connect(Member.objects.send_transfer_workspace_key_info,
                      sender=Member
                      )