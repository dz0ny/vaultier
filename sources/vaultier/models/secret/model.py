import os
from django.db import models
from django.db.models.deletion import PROTECT, CASCADE, SET_NULL
from django.db.models.manager import Manager
from app.settings_base import MEDIA_ROOT
from modelext.softdelete.softdelete import SoftDeleteManagerMixin, SoftDeleteMixin
from vaultier.models.acl.fields import AclLevelField
from vaultier.models.secret.fields import SecretTypeField
from modelext.changes.changes import ChangesMixin, DELETE, post_change


class SecretManager(SoftDeleteManagerMixin, Manager):
    def get_queryset(self):
        queryset = super(SecretManager, self).get_queryset()
        return queryset.filter(
            card__vault__workspace__deleted_at=None,
            card__vault__deleted_at=None,
            card__deleted_at=None,
        )


    def on_model(self, signal=None, sender=None, instance=None, event_type=None, **kwargs):
        if event_type == DELETE and instance.blob:
            instance.blob.delete()


    def all_for_user(self, user):
        from vaultier.models.card.model import Card

        cards = Card.objects.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        secrets = self.filter(
            card__in=cards
        )

        return secrets


def get_blob_data_filename(instance, filename):
    path = MEDIA_ROOT
    id = str(instance.id)
    subpath = '/'.join(list(id))
    fname = 'secret_'+str(instance.id)+'.encrypted.bin'
    return os.path.join(path, subpath, fname)

class Secret(ChangesMixin, SoftDeleteMixin, models.Model):
    class Meta:
        db_table = u'vaultier_secret'
        app_label = 'vaultier'

    objects = SecretManager()

    name = models.CharField(max_length=255, default='', blank=True, null=True)
    type = SecretTypeField()
    data = models.TextField(null=True, blank=True)
    blob_data = models.FileField(upload_to=get_blob_data_filename, null=True, blank=True)
    blob_meta = models.TextField(null=True, blank=True)
    card = models.ForeignKey('vaultier.Card', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def register_signals():
    post_change.connect(Secret.objects.on_model, sender=Secret)