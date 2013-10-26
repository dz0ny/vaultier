from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.fields import IntegerField
from django.db.models.manager import Manager
from core.models.acl import AclLevelField


class RoleManager(Manager):

    def create_or_merge(self, role):
        existing = None
        try:
            existing = Role.objects.filter(
                member=role.member,
                to_workspace=role.to_workspace,
                to_vault=role.to_vault,
                to_card=role.to_card
            )[0]

        except:
            pass

        if not existing:
            role.save(disable_merge=True)
            return role
        else:
            #todo: after level will be migrated to numbers, level would be changed only in case role.level > existing.level
            existing.level = role.level
            existing.member = role.member
            existing.save(disable_merge=True)
            return existing


class Role(models.Model):
    class Meta:
        db_table = u'vaultier_role'
        app_label = 'core'

    objects = RoleManager()

    member = models.ForeignKey('core.Member', on_delete=CASCADE)
    to_workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('core.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('core.Card', on_delete=CASCADE, null=True, blank=True)
    level = AclLevelField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='roles_created')

    def get_object(self):
        if self.to_workspace:
            return self.to_workspace
        if self.to_vault:
            return self.to_vault
        if self.to_card:
            return self.to_card

        raise RuntimeError('Role has no associated object')


    # Save is overriden to ensure always only one role is related to member
    def save(self, *args, **kwargs):
        disable_merge = kwargs.pop('disable_merge', None)
        if disable_merge:
            return super(Role, self).save(*args, **kwargs)
        else:
            return Role.objects.create_or_merge(self)

