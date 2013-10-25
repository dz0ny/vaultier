from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager


class RoleManager(Manager):
    def createRole(self, role):
        existing = None
        try:
            existing = Role.objects.filter(member=role.member)[0]
        except:
            pass

        if not existing:
            role.save(standard=True)
            return role
        else:
            existing.level = role.level
            existing.save(standard=True)
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

    def save(self, *args, **kwargs):
        standard = kwargs.pop('standard', None)
        if standard:
            return super(Role, self).save(*args, **kwargs)
        else:
            return Role.objects.createRole(self)

