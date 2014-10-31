from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.db.models.signals import pre_save, post_save
from accounts.business.fields import MemberStatusField
from libs.changes.changes import ChangesMixin
from libs.lowercasefield.lowercasefield import LowerCaseCharField
from .business.managers import UserManager, LostKeyManager, MemberManager, \
    TokenManager
from django.utils import timezone
import random


class User(ChangesMixin, AbstractBaseUser):

    nickname = models.CharField(max_length=255, blank=False, null=False)
    public_key = models.CharField(max_length=1024)
    email = LowerCaseCharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    class Meta:
        db_table = u'vaultier_user'


class Token(ChangesMixin, models.Model):

    TOKEN_LENGTH = 64
    """
    Length of generated token
    """
    token = models.CharField(max_length=TOKEN_LENGTH, unique=True,
                             db_index=True)
    user = models.ForeignKey('accounts.User', on_delete=CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_used_at = models.DateTimeField(null=True)

    objects = TokenManager()

    class Meta:
        db_table = u'vaultier_token'

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_token()
        if not self.last_used_at:
            self.last_used_at = timezone.now()
        return super(Token, self).save(*args, **kwargs)

    def generate_token(self):
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW' \
                'XYZ!"#$%&\()*+,-./:;<=>?@[\]^_`{|}~'
        unique = ''.join(random.choice(chars) for i in range(
            Token.TOKEN_LENGTH))
        return unique

    def __unicode__(self):
        return self.key


class LostKey(models.Model):
    objects = LostKeyManager()

    hash = models.TextField(null=False)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT,
                                   related_name='distracted')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(null=False)
    used = models.BooleanField(default=False)

    class Meta:
        db_table = u'vaultier_lost_key'


class Member(ChangesMixin, models.Model):

    workspace = models.ForeignKey(
        'workspaces.Workspace', related_name='membership', on_delete=CASCADE)

    user = models.ForeignKey(
        'accounts.User', on_delete=CASCADE, null=True,
        related_name='membership')
    invitation_hash = models.CharField(max_length=64, null=True, unique=True)
    invitation_email = LowerCaseCharField(max_length=1024, null=True)
    workspace_key = models.CharField(max_length=4096)
    status = MemberStatusField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        'accounts.User', on_delete=PROTECT, related_name='members_created')
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
    pre_save.connect(LostKey.objects.on_pre_save, sender=LostKey)
    post_save.connect(LostKey.objects.send_notification, sender=LostKey)
    post_save.connect(
        Member.objects.send_transfer_workspace_key_info, sender=Member)
