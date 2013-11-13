from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
import hmac
import uuid
from core.models.member_fields import MemberStatusField
from hashlib import sha1
from core.tools.changes import ChangesMixin


class MemberManager(Manager):

    #from members where member.workspace in (select

    def all_acls(self, user):
        from core.models.workspace import Workspace
        workspaces = Workspace.objects.all_for_user(user)
        result = Member.objects.filter(workspace__in=workspaces)
        return result

    def generate_invitation_hash(self):
        #todo: ensure invitation hash is unique

        unique = uuid.uuid4()
        return hmac.new(unique.bytes, digestmod=sha1).hexdigest()

    def get_member_to_workspace(self, workspace, user):
        member = None
        try:
            member = self.filter(
                workspace=workspace,
                user=user,
                status__gt=0
            )[0]
        except:
            pass

        return member

    def join_member(self, source, target):
        for role in source.role_set.all():
            role.member = target
            role.save()

    def accept_invitation(self, member, user):
        workspace = member.workspace
        existing_member = self.get_member_to_workspace(workspace, user)

        # user membership does not exists, or it is only invite
        if not existing_member:
            member.user = user
            member.status = MemberStatusField.STATUS_NON_APPROVED_MEMBER
            member.save(update_fields=['status', 'user'])

        # membership exists, we need to joind current membership to existing
        else:
            self.join_member(member, existing_member)
            member.delete()
            member = existing_member
            member.save(update_fields=['status'])

        # reload member
        member = Member.objects.get(id=member.id)

        return member


    def invite(self, member, send=True, resend=True):
        try:
            member = Member.objects.get(invitation_email=member.invitation_email, workspace=member.workspace)
            if send:
                pass
                # send invitation here

        except Member.DoesNotExist:
            member.status = MemberStatusField.STATUS_INVITED
            member.save()
            if resend:
                pass
                # send invitation here

        #todo: Member.MultipleObjectsFound

        return member


class Member(ChangesMixin, models.Model):
    objects = MemberManager()

    class Meta:
        db_table = u'vaultier_member'
        app_label = 'core'

    workspace = models.ForeignKey('core.Workspace', related_name='membership', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE, null=True)
    invitation_hash = models.CharField(max_length=64, null=True, unique=True)
    invitation_email = models.CharField(max_length=1024, null=True)
    status = MemberStatusField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='members_created')

    def is_invitation(self):
        if self.status == MemberStatusField.STATUS_INVITED:
            return True
        return False

    def save(self, *args, **kwargs):
        if not self.invitation_hash:
            self.invitation_hash = Member.objects.generate_invitation_hash()
        return super(Member, self).save(*args, **kwargs)


