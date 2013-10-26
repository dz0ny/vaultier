from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.fields import IntegerField
from django.db.models.manager import Manager

class AclLevelField(models.IntegerField):

    LEVEL_READ = 100
    LEVEL_WRITE = 200

    ACL_CHOICES = (
        (LEVEL_READ, 'READ'),
        (LEVEL_WRITE, 'WRITE')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ACL_CHOICES
        super(AclLevelField, self).__init__(*args, **kwargs)


class AclManager(Manager):

    def materialize_user(self, user):
        pass

    def materialize_role(self, role):
        pass

class Acl(models.Model):
    objects = AclManager()



    class Meta:
        db_table = u'vaultier_acl'
        app_label = 'core'

    level = AclLevelField()

    role = models.ForeignKey('core.Role', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE)
    to_workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('core.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('core.Card', on_delete=CASCADE, null=True, blank=True)


