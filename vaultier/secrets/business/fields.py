from django.db import models
from rest_framework.fields import FileField
from vaultier.business.fields import PermsField
from django.core.exceptions import ValidationError


class SecretPermsField(PermsField):

    def get_acls(self, obj, user):
        return obj.card.acl_set.filter(
            user=user
        )


class SecretTypeField(models.IntegerField):

    SECRET_TYPE_NOTE = 100
    SECRET_TYPE_PASSWORD = 200
    SECRET_TYPE_FILE = 300

    SECRET_TYPE_CHOICES = (
        (SECRET_TYPE_NOTE, 'NOTE'),
        (SECRET_TYPE_FILE, 'FILE'),
        (SECRET_TYPE_PASSWORD, 'PASSWORD')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.SECRET_TYPE_CHOICES
        super(SecretTypeField, self).__init__(*args, **kwargs)


class BlobDataField(FileField):

    def to_native(self, value):
        return value.read()

    def from_native(self, data):
        max_size = 100 * 1000
        if not data:
            raise ValidationError('At least blob_data must be specified')

        if data and hasattr(data, 'size') and data.size > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        if data and not hasattr(data, 'size') and len(data) > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        return super(BlobDataField, self).from_native(data)
