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
from accounts.business.mailer import LostKeyMailer, InvitationMailer, \
    WorkspaceKeyTransferMailer
from django.db.models.aggregates import Count


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
        Soft delete nan shared nodes of a given user
        :param user:
        :return:
        """
        self._disable_memberships(user)
        self._softdelete_unrecoverable_nodes(user)

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
    def is_recoverable(cls, node_id, user):
        """
        Return True if the node is recoverable.
        A work space is recoverable when it share among any user and those
        users have the status set to MemberStatusField.STATUS_MEMBER
        :param node_id: int
        :param user: vaultier.models.user.model.User
        :return: bool
        """
        return 0 < get_model('accounts', 'Member').objects.filter(
            node_id=node_id,
            status=MemberStatusField.STATUS_MEMBER).exclude(user=user).count()

    def rebuild_lost_key(self, user):
        """
        :param user:
        :return:
        """
        self._set_unrecoverable_nodes_broken(user)
        self._set_status_member_without_workspace_key(user)
        self._softdelete_unrecoverable_nodes(user)

    def _set_status_member_without_workspace_key(self, user):
        """
        Update status of shared memberships for a given user
        :param user:
        :return:
        """
        unrecoverable_nodes = self._get_unrecoverable_nodes(user)
        get_model('accounts', 'Member').objects.filter(user=user) \
            .exclude(
                node_id__in=unrecoverable_nodes.
                values_list('pk', flat=True)
            ).update(
                status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY,
                workspace_key=''
            )

    def _set_unrecoverable_nodes_broken(self, user):
        """
        Set the membership status to broken
        just for nonrecoverable nodes
        :param user:
        :return:
        """
        unrecoverable_nodes = self._get_unrecoverable_nodes(user)
        get_model('accounts', 'Member').objects.filter(
            user=user, node_id__in=unrecoverable_nodes
            .values_list('pk', flat=True)) \
            .update(status=MemberStatusField.STATUS_MEMBER_BROKEN)

    def _softdelete_unrecoverable_nodes(self, user):
        """
        Deletes unrecoverable nodes
        :param user:
        :return:
        """
        unrecoverable_nodes = self._get_unrecoverable_nodes(user)
        # todo: should be soft!
        unrecoverable_nodes.delete()

    def _get_unrecoverable_nodes(self, user):
        """
        Filter Workspace where the user is the only member
        :param user:
        :return: QuerySet
        """
        member_cls = get_model('accounts', 'Member')
        return get_model('nodes', 'Node').objects.filter(
            pk__in=member_cls.objects.filter(user=user).values_list(
                'node_id', flat=True)
        ).annotate(is_recoverable=Count('membership')).exclude(
            is_recoverable__gt=1)


class MemberManager(Manager):

    def all_for_user(self, user):

        node = get_model('nodes', 'Node').objects.all_for_user(user)
        return get_model('accounts', 'Member').objects.\
            filter(node__in=node)

    def all_to_transfer_keys(self, user):

        node_where_user_is_member_with_keys = \
            get_model('nodes', 'Node').objects.filter(
                membership__status=MemberStatusField.STATUS_MEMBER,
                membership__user=user
            ).distinct()

        # has key can see all without workspace key
        # OR
        # has not key, can work only with own workspace key

        query = self.all_for_user(user).filter(
            Q(
                Q(node__in=node_where_user_is_member_with_keys)
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

    def get_concrete_member_to_node(self, node, user):
        member = None
        try:
            member = self.filter(
                node=node,
                user=user,
                status__gt=MemberStatusField.STATUS_INVITED
            )[0]
        except:
            pass

        return member

    def accept_invitation(self, member, user):
        existing_member = self.get_concrete_member_to_node(
            member.node, user
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
                node=member.node
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

    def to_node(self, user, node):
        """
        Return Member to node. No matter where node is in tree

        :param user: accounts.models.User
        :param node: nodes.models.Node
        :return:
        """
        return self.get(node=node.get_root(), user=user)


class TokenManager(Manager):

    def clean_old_tokens(self):
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        expired_date = datetime.now() - timedelta(hours=token_lifetime)
        self.filter(last_used_at__lte=expired_date).delete()
