from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from acls.business.managers import RoleManager
from libs.changes.changes import ChangesMixin, post_change
from vaultier.business.fields import ObjectReferenceTypeField
from vaultier.business.reference import ObjectReference
from .business.fields import RoleLevelField, AclDirectionField


class Acl(ObjectReference, models.Model):

    type = ObjectReferenceTypeField()
    to_workspace = models.ForeignKey('workspaces.Workspace', on_delete=CASCADE,
                                     null=True, blank=True)
    to_vault = models.ForeignKey('vaults.Vault', on_delete=CASCADE,
                                 null=True, blank=True)
    to_card = models.ForeignKey('cards.Card', on_delete=CASCADE, null=True,
                                blank=True)
    level = RoleLevelField()

    direction = AclDirectionField()
    role = models.ForeignKey('acls.Role', on_delete=CASCADE)
    user = models.ForeignKey('accounts.User', on_delete=CASCADE)

    class Meta:
        db_table = u'vaultier_acl'

    def get_target_string(self):
        if self.type == 100:
            return 'workspace:'+str(self.to_workspace.id)
        if self.type == 200:
            return 'vault:'+str(self.to_vault.id)
        if self.type == 300:
            return 'card:'+str(self.to_card.id)

    def __unicode__(self):
        return 'Acl({}): to:{} level:{} user: {}'.format(
            self.id,
            self.get_target_string(),
            self.level,
            self.user
        )


class Role(ChangesMixin, ObjectReference, models.Model):
    objects = RoleManager()

    type = ObjectReferenceTypeField()

    to_workspace = models.ForeignKey('workspaces.Workspace', on_delete=CASCADE,
                                     null=True, blank=True)
    to_vault = models.ForeignKey('vaults.Vault', on_delete=CASCADE,
                                 null=True, blank=True)
    to_card = models.ForeignKey('cards.Card', on_delete=CASCADE,
                                null=True, blank=True)
    member = models.ForeignKey('accounts.Member', on_delete=CASCADE)

    level = RoleLevelField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('accounts.User', on_delete=PROTECT,
                                   related_name='roles_created')

    class Meta:
        db_table = u'vaultier_role'

    def save(self, *args, **kwargs):
        self.compute_type()
        return super(Role, self).save(*args, **kwargs)


def register_signals():
    post_change.connect(Role.objects.on_model, sender=Role)
