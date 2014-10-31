import os
from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.conf import settings
from libs.softdelete.softdelete import SoftDeleteMixin
from libs.tree.iterator import TreeIterableModelMixin
from secrets.business.fields import SecretTypeField
from secrets.business.managers import SecretManager
from libs.changes.changes import ChangesMixin
from secrets.business.tree import SecretTreeIterator


def get_blob_data_filename(instance, filename):
    path = settings.MEDIA_ROOT
    id = str(instance.id)
    subpath = '/'.join(list(id))
    fname = 'secret_'+str(instance.id)+'.encrypted.bin'
    return os.path.join(path, subpath, fname)


class Secret(ChangesMixin, SoftDeleteMixin, TreeIterableModelMixin,
             models.Model):

    tree_iterator_class = SecretTreeIterator

    objects = SecretManager()

    name = models.CharField(max_length=255, default='', blank=True, null=True)

    type = SecretTypeField()

    data = models.TextField(null=True, blank=True)
    blob_data = models.FileField(upload_to=get_blob_data_filename, null=True,
                                 blank=True)
    blob_meta = models.TextField(null=True, blank=True)
    card = models.ForeignKey('cards.Card', on_delete=CASCADE)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = u'vaultier_secret'
