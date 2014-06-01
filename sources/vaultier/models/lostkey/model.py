import hashlib
import datetime
from django.utils.timezone import utc
from django.db.models.aggregates import Max
from django.db.models.expressions import F
from django.utils import timezone
from django.db import models
from django.db.models.deletion import PROTECT
from django.db.models.manager import Manager
from django.db.models.signals import pre_save, post_save
from django.conf import settings
from vaultier.mailer.lostkey import send_lost_key_notification


class LostKeyManager(Manager):

    def on_pre_save(self, sender, instance=None, *args, **kwargs):
        self.generate_hash(instance=instance)
        self.generate_expiration_time(instance=instance)

    def generate_hash(self, instance=None):
        hash_key = instance.created_by.email + instance.created_by.nickname
        hash = hashlib.sha1(hash_key)
        instance.hash = hash.hexdigest()

    def generate_expiration_time(self, instance=None):
        expiration_time = settings.BK_FEATURES.get('lostkey_hash_expiration_time')
        instance.expires_at = timezone.now().replace(tzinfo=utc) + \
                              datetime.timedelta(milliseconds=expiration_time)

    def send_notification(self, sender, instance=None, *args, **kwargs):
        """
        Sends email to user with the valid url for update the public key
        :param sender:
        :param instance:
        :param args:
        :param kwargs:
        :return:
        """
        send_lost_key_notification(instance)


class LostKey(models.Model):
    class Meta:
        db_table = u'vaultier_lost_key'
        app_label = 'vaultier'

    objects = LostKeyManager()
    hash = models.TextField(null=False)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT, related_name='distracted')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(null=False)
    used = models.BooleanField(default=False)


def register_signals():
    pre_save.connect(LostKey.objects.on_pre_save, sender=LostKey)
    post_save.connect(LostKey.objects.send_notification, sender=LostKey)
