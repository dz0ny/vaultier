from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
import hmac
import uuid
from django.db.models.query_utils import Q
from vaultier.mailer.invitation import resend_invitation
from vaultier.models.acl_fields import AclLevelField
from vaultier.models.member_fields import MemberStatusField
from hashlib import sha1
from vaultier.tools.changes import ChangesMixin


class MemberManager(Manager):
    #from members where member.workspace in (select

    def all_for_user(self, user):
        from vaultier.models.workspace import Workspace

        workspaces = Workspace.objects.all_for_user(user)
        result = Member.objects.filter(workspace__in=workspaces)
        return result

    def all_to_transfer_keys(self, user):
        from vaultier.models.workspace import Workspace

        # only members where current user has transfered key
        workspaces_with_keys = Workspace.objects.filter(
            membership__status=MemberStatusField.STATUS_MEMBER,
            membership__user=user
        )

        query = Member.objects.all_for_user(user).filter(
                Q(status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY)
                &
                Q(workspace__in=workspaces_with_keys)
                &
                ~Q(user=user)
        ).distinct()

        return query

    def generate_invitation_hash(self):
        def get_unique():
            unique = uuid.uuid4()
            return hmac.new(unique.bytes, digestmod=sha1).hexdigest()

        hash = get_unique()
        while self.filter(invitation_hash=hash):
            hash = get_unique()

        return hash

    def get_conrete_member_to_workspace(self, workspace, user):
        member = None
        try:
            member = self.filter(
                workspace=workspace,
                user=user,
                status__gt=MemberStatusField.STATUS_INVITED
            )[0]
        except:
            pass

        return member

    def join_member(self, source, target):
        for role in source.role_set.all():
            role.member = target
            role.save()
        source.delete()
        self.remove_role_duplicatates(target)

    def remove_role_duplicatates(self, member):
        # @todo: optimize this, many queries done
        for role in member.role_set.all():
            delete = member.role_set.filter(
                to_workspace=role.to_workspace,
                to_vault=role.to_vault,
                to_card=role.to_card,
                level__gte=role.level
            ).exclude(id=role.id).count() >= 1
            if delete:
                role.delete()

    def accept_invitation(self, member, user):
        workspace = member.workspace
        existing_member = self.get_conrete_member_to_workspace(workspace, user)

        # user membership does not exists, or it is only invite
        if not existing_member:
            member.user = user
            member.status = MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY
            member.save()

        # membership exists, we need to join current membership to existing
        else:
            self.join_member(member, existing_member)
            member = existing_member

        # reload member
        member = Member.objects.get(id=member.id)

        return member


    def invite(self, member, send=True, resend=True):
        try:
            # find invitation
            member = Member.objects.get(
                status=MemberStatusField.STATUS_INVITED,
                invitation_email=member.invitation_email,
                workspace=member.workspace
            )
            if resend:
                resend_invitation(member)

        # invitation not found so create new
        except Member.DoesNotExist:
            member.id = None
            member.status = MemberStatusField.STATUS_INVITED
            member.save()
            if send:
                resend_invitation(member)

        #todo: Member.MultipleObjectsFound

        return member


class Member(ChangesMixin, models.Model):
    objects = MemberManager()

    class Meta:
        db_table = u'vaultier_member'
        app_label = 'vaultier'

    workspace = models.ForeignKey('vaultier.Workspace', related_name='membership', on_delete=CASCADE)
    user = models.ForeignKey('vaultier.User', on_delete=CASCADE, null=True)
    invitation_hash = models.CharField(max_length=64, null=True, unique=True)
    invitation_email = models.CharField(max_length=1024, null=True)
    workspace_key = models.CharField(max_length=4096)
    status = MemberStatusField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT, related_name='members_created')

    def is_invitation(self):
        if self.status == MemberStatusField.STATUS_INVITED:
            return True
        return False

    def save(self, *args, **kwargs):
        if not self.invitation_hash:
            self.invitation_hash = Member.objects.generate_invitation_hash()
        return super(Member, self).save(*args, **kwargs)


