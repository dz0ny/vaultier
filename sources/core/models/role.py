from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager


class RoleManager(Manager):
    def createRole(self, role):
        existing = Role.objects.filter(member=role.member)[0]
        if not existing:
            return role.save()
        else:
            existing.level = role.level
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
    level = models.CharField(
        max_length=1,
        choices=(
            (u'0', u'DENIED'),
            (u'r', u'READ'),
            (u'c', u'READ+CREATE'),
            (u'w', u'WRITE'),
            (u'a', u'ADMIN'),
        ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='roles_created')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        return Role.objects.createRole(self)

