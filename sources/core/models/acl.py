from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.fields import IntegerField
from django.db.models.manager import Manager
from core.models.card import Card
from core.models.vault import Vault
from core.models.workspace import Workspace

class AclRolesCollection(object):
    roles = []

    def add(self, role_to_add):
        for idx in self.roles:
            role = self.roles[idx]


class AclRoleMaterializer(object):

    role = None
    user = None

    def __init__(self, role, user):
        self.role = role
        self.user = user

    def materialize(self, direction):
        pass

    def acl_for_object(self, object, direction):
        acl = Acl()
        acl.role = self.role
        acl.direction = direction
        acl.user = self.user
        if direction == AclDirectionField.DIR_UP:
            acl.level = AclLevelField.LEVEL_READ
        else:
            acl.level = self.role.level

        if isinstance(object, Workspace):
          acl.to_workspace = object
        elif isinstance(object, Vault):
          acl.to_vault = object
        elif isinstance(object, Card):
          acl.to_card = object
        else:
            raise RuntimeError('Usupported ACL object')

        return acl

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

class AclDirectionField(models.IntegerField):

    DIR_UP = -1
    DIR_DOWN = 1

    DIR_CHOICES = (
        (DIR_UP, 'UP'),
        (DIR_DOWN, 'DOWN')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.DIR_CHOICES
        super(AclDirectionField, self).__init__(*args, **kwargs)


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
    direction = AclDirectionField()
    role = models.ForeignKey('core.Role', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE)
    to_workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('core.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('core.Card', on_delete=CASCADE, null=True, blank=True)


