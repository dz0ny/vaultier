import hmac
import uuid
from datetime import datetime, timedelta
from django.contrib.auth.models import BaseUserManager
from django.db.models import Q
from django.db.models.loading import get_model
from django.db.models.manager import Manager
from django.utils import timezone
from hashlib import sha1
from django.utils.timezone import utc
from django.conf import settings
from accounts.business.fields import MemberStatusField
from accounts.business.mailer import LostKeyMailer
from django.db.models.aggregates import Count
from workspaces.business.mailer import InvitationMailer, \
    WorkspaceKeyTransferMailer


class UserManager(BaseUserManager):

    def create_user(self, username, email=None, password=None, **extra_fields):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = UserManager.normalize_email(email)
        user = self.model(username=username, email=email,
                          is_staff=False, is_active=True, is_superuser=False,
                          last_login=now, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        u = self.create_user(username, email, password, **extra_fields)
        u.is_staff = True
        u.is_active = True
        u.is_superuser = True
        u.save(using=self._db)
        return u


class LostKeyManager(Manager):

    def on_pre_save(self, sender, instance=None, *args, **kwargs):
        if not instance.id:
            self._generate_hash(instance=instance)
            self._generate_expiration_time(instance=instance)

    def _generate_hash(self, instance=None):
        unique_hash = uuid.uuid4()
        instance.hash = hmac.new(unique_hash.bytes, digestmod=sha1).hexdigest()

    def _generate_expiration_time(self, instance=None):
        expiration_time = settings.VAULTIER.get(
            'lostkey_hash_expiration_time')
        instance.expires_at = timezone.now().replace(tzinfo=utc) + \
            timedelta(milliseconds=expiration_time)

    def send_notification(self, sender, instance=None, *args, **kwargs):
        """
        Sends email to user with the valid url for update the public key
        :param sender:
        :param instance:
        :param args:
        :param kwargs:
        :return: None
        """
        if not instance.used:
            sender = LostKeyMailer(object=instance)
            sender.send()

    def disable_lost_key(self, user):
        """
        Soft delete nan shared workspaces of a given user
        :param user:
        :return:
        """
        self._disable_memberships(user)
        self._softdelete_unrecoverable_workspaces(user)

    @classmethod
    def _disable_memberships(cls, user):
        """
        Set all membership of given user to
        MemberStatusField.STATUS_MEMBER_BROKEN
        :param user:
        :return:
        """
        get_model('accounts', 'Member').objects.filter(user=user).update(
            status=MemberStatusField.STATUS_MEMBER_BROKEN)

    @classmethod
    def find_workspace_is_recoverable(cls, workspace_id, user):
        """
        Return True if the workspace is recoverable.
        A work space is recoverable when it share among any user and those
        users have the status set to MemberStatusField.STATUS_MEMBER
        :param workspace_id: int
        :param user: vaultier.models.user.model.User
        :return: bool
        """
        return 0 < get_model('accounts', 'Member').objects.filter(
            workspace_id=workspace_id,
            status=MemberStatusField.STATUS_MEMBER).exclude(user=user).count()

    def rebuild_lost_key(self, user):
        """
        :param user:
        :return:
        """
        self._set_unrecoverable_workspaces_broken(user)
        self._set_status_member_without_workspace_key(user)
        self._softdelete_unrecoverable_workspaces(user)

    def _set_status_member_without_workspace_key(self, user):
        """
        Update status of shared memberships for a given user
        :param user:
        :return:
        """
        unrecoverable_workspaces = self._get_unrecoverable_workspaces(user)
        get_model('accounts', 'Member').objects.filter(user=user) \
            .exclude(
                workspace_id__in=unrecoverable_workspaces.
                values_list('pk', flat=True)
            ).update(
                status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY,
                workspace_key=''
            )

    def _set_unrecoverable_workspaces_broken(self, user):
        """
        Set the membership status to broken
        just for nonrecoverable workspaces
        :param user:
        :return:
        """
        unrecoverable_workspaces = self._get_unrecoverable_workspaces(user)
        get_model('accounts', 'Member').objects.filter(
            user=user,
            workspace_id__in=unrecoverable_workspaces
            .values_list('pk', flat=True)) \
            .update(status=MemberStatusField.STATUS_MEMBER_BROKEN)

    def _softdelete_unrecoverable_workspaces(self, user):
        """
        Deletes workspaces whe
        :param user:
        :return:
        """
        unrecoverable_workspaces = self._get_unrecoverable_workspaces(user)
        get_model('workspaces', 'Workspace').bulk_delete(
            unrecoverable_workspaces)

    def _get_unrecoverable_workspaces(self, user):
        """
        Filter Workspace where the user is the only member
        :param user:
        :return: QuerySet
        """
        member_cls = get_model('accounts', 'Member')
        return get_model('workspaces', 'Workspace').objects.filter(
            pk__in=member_cls.objects.filter(user=user).values_list(
                'workspace_id', flat=True)
        ).annotate(is_recoverable=Count('membership')).exclude(
            is_recoverable__gt=1)


class MemberManager(Manager):

    def all_for_user(self, user):
        from workspaces.models import Workspace

        workspaces = Workspace.objects.all_for_user(user)
        return get_model('accounts', 'Member').objects.\
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
        member = get_model('accounts', 'Member').objects.get(id=member.id)

        return member

    def invite(self, member, send=True, resend=True):

        member_cls = get_model('accounts', 'Member')

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
        invitation_sender = InvitationMailer(object=member)
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
            sender = WorkspaceKeyTransferMailer(object=instance)
            sender.send()

    def clean_old_invitations(self):
        lifetime_in_days = settings.VAULTIER.get("invitation_lifetime")
        expired_date = timezone.now() - timedelta(days=lifetime_in_days)
        self.filter(status=MemberStatusField.STATUS_INVITED,
                    created_at__lt=expired_date
                    ).delete()


class TokenManager(Manager):

    def clean_old_tokens(self):
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        expired_date = datetime.now() - timedelta(hours=token_lifetime)
        self.filter(last_used_at__lte=expired_date).delete()
