import hmac
import uuid
from django.db.models.loading import get_model
from django.db.models.manager import Manager
from acls.business.fields import AclLevelField, RoleLevelField
from acls.models import Role
from libs.softdelete.softdelete import SoftDeleteManagerMixin
from vaultier.business.mailer.invitation.sender import InvitationEmailSender
from vaultier.business.mailer.transfer_workspace_key.sender import \
    WorkspaceKeyTransferEmailSender
from workspaces.business.fields import MemberStatusField
from django.db.models.query import Q
from hashlib import sha1


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
            msg = '_user attribute is required to create related membership'
            raise AttributeError(msg)

        m = get_model('workspaces', 'Member')(
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


class MemberManager(Manager):

    def all_for_user(self, user):
        from ..models import Workspace

        workspaces = Workspace.objects.all_for_user(user)
        return get_model('workspaces', 'Member').objects.\
            filter(workspace__in=workspaces)

    def all_to_transfer_keys(self, user):

        workspaces_where_user_is_member_with_keys = \
            get_model('workspaces', 'Workspace').objects.filter(
                membership__status=MemberStatusField.STATUS_MEMBER,
                membership__user=user
            ).distinct()

        # has key can see all without workspace key
        # OR
        # has not key, can work only with own workspace key

        query = self.all_for_user(user).filter(
            Q(
                Q(workspace__in=workspaces_where_user_is_member_with_keys)
                &
                Q(status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY)
            )
            |
            Q(
                user=user
            )
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

    def get_concrete_member_to_workspace(self, workspace, user):
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
        existing_member = self.get_concrete_member_to_workspace(
            workspace, user
        )

        # user membership does not exists, or it is only invite
        if not existing_member:
            member.user = user
            member.status = MemberStatusField.\
                STATUS_MEMBER_WITHOUT_WORKSPACE_KEY
            member.save()

        # membership exists, we need to join current membership to existing
        else:
            self.join_member(member, existing_member)
            member = existing_member

        # reload member
        member = get_model('workspaces', 'Member').objects.get(id=member.id)

        return member

    def invite(self, member, send=True, resend=True):

        member_cls = get_model('workspaces', 'Member')

        try:
            # find invitation
            member = member_cls.objects.get(
                status=MemberStatusField.STATUS_INVITED,
                invitation_email=member.invitation_email,
                workspace=member.workspace
            )
            if resend:
                self.send_invitation(member)

        # invitation not found so create new
        except member_cls.DoesNotExist:
            member.id = None
            member.status = MemberStatusField.STATUS_INVITED
            member.save()
            if send:
                self.send_invitation(member)

        # todo: Member.MultipleObjectsFound

        return member

    def send_invitation(self, member):
        """
        Sends an invitation email
        :param member: Member
        :return: None
        """
        invitation_sender = InvitationEmailSender(member)
        invitation_sender.send()

    def send_transfer_workspace_key_info(self, sender, instance=None, *args,
                                         **kwargs):
        """

        :param sender:
        :param instance:
        :param args:
        :param kwargs:
        :return:
        """
        if instance.status == MemberStatusField.STATUS_MEMBER and \
                instance.invitation_email and instance.invitation_hash:
            # the user has been invited and the workspace_key was set
            sender = WorkspaceKeyTransferEmailSender(instance)
            sender.send()