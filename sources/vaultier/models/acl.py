from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.manager import Manager
from vaultier.models.acl_fields import AclDirectionField
from vaultier.models.role_fields import RoleLevelField
from vaultier.models.object_reference import ObjectReference, ObjectReferenceTypeField


class AclManager(Manager):
    pass

class Acl(ObjectReference,models.Model):
    class Meta:
        db_table = u'vaultier_acl'
        app_label = 'vaultier'

    objects = AclManager()

    type = ObjectReferenceTypeField()
    to_workspace = models.ForeignKey('vaultier.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('vaultier.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('vaultier.Card', on_delete=CASCADE, null=True, blank=True)

    level = RoleLevelField()
    direction = AclDirectionField()
    role = models.ForeignKey('vaultier.Role', on_delete=CASCADE)
    user = models.ForeignKey('vaultier.User', on_delete=CASCADE)

    def get_target_string(self):
        if (self.type == 100):
            return 'workspace:'+str(self.to_workspace.id)
        if (self.type == 200):
            return 'vault:'+str(self.to_vault.id)
        if (self.type == 300):
            return 'card:'+str(self.to_card.id)

    def __unicode__(self):
        return 'Acl(' + str(self.id) + '): to:' + str(self.get_target_string()) + ' level:' + str(self.level) + ' user: '+str(self.user)