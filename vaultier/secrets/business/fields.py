from django.db import models
from vaultier.business.fields import PermsField


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
