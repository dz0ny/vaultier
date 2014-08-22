import hmac
import uuid
from datetime import datetime
from django.contrib.auth.models import BaseUserManager
from django.db.models.loading import get_model
from django.db.models.manager import Manager
from django.utils import timezone
from hashlib import sha1
from django.utils.timezone import utc
from django.conf import settings
from vaultier.business.mailer.lostkey.sender import LostKeyEmailSender
from workspaces.business.fields import MemberStatusField
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
        expiration_time = settings.BK_FEATURES.get(
            'lostkey_hash_expiration_time')
        instance.expires_at = timezone.now().replace(tzinfo=utc) + \
                              datetime.timedelta(milliseconds=expiration_time)

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
            sender = LostKeyEmailSender(instance)
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
        Set all membership of given user to MemberStatusField.STATUS_MEMBER_BROKEN
        :param user:
        :return:
        """
        get_model('workspaces', 'Member').objects.filter(user=user).update(
            status=MemberStatusField.STATUS_MEMBER_BROKEN)

    @classmethod
    def find_workspace_is_recoverable(cls, workspace_id, user):
        """
        Return True if the workspace is recoverable.
        A work space is recoverable when it share among any user and those users have
        the status set to MemberStatusField.STATUS_MEMBER
        :param workspace_id: int
        :param user: vaultier.models.user.model.User
        :return: bool
        """
        return 0 < get_model('workspaces', 'Member').objects.filter(
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
        get_model('workspaces', 'Member').objects.filter(user=user) \
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
        get_model('workspaces', 'Member').objects.filter(
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
        get_model('workspaces', 'Workspace').bulk_delete(unrecoverable_workspaces)

    def _get_unrecoverable_workspaces(self, user):
        """
        Filter Workspace where the user is the only member
        :param user:
        :return: QuerySet
        """
        member_cls = get_model('workspaces', 'Member')
        return get_model('workspaces', 'Workspace').objects.filter(
            pk__in=member_cls.objects.filter(user=user).values_list(
                'workspace_id', flat=True)
        ).annotate(is_recoverable=Count('membership')).exclude(
            is_recoverable__gt=1)
