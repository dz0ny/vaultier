from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from core.auth.rolechecker import RoleChecker
from core.auth.rolesumarizer import RoleSummarizer
from core.models.role_fields import RoleLevelField
from core.models.object_reference import ObjectReference, ObjectReferenceTypeField
from core.tools.changes import ChangesMixin


class RoleManager(Manager):
    def get_roles_to_object(self, object, user):
        checker = RoleChecker()
        return checker.get_roles_and_parent_roles(object, user)

    def get_summarized_role_to_object(self, object, user):
        roles = self.get_roles_to_object(object, user)
        summarizer = RoleSummarizer()
        return summarizer.summarize_roles(roles)

    def all_for_user(self, user):
        from core.models.workspace import Workspace


        # all workspaces user has permission write
        workspaces = Workspace.objects.filter(
            acl__level = RoleLevelField.LEVEL_WRITE,
            acl__user = user
        ).distinct()

        # all roles (to_workspace, to_vault, to_card) related to workspaces in which user has permission to write
        roles = self.filter(
            member__workspace__in=workspaces
        )

        return roles


    def create_or_update_role(self, role):
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
            role.save()
            return role
        else:
            existing.level = role.level
            existing.member = role.member
            existing.save()
            return existing


class Role(ChangesMixin,ObjectReference,models.Model):

    class Meta:
        db_table = u'vaultier_role'
        app_label = 'core'

    objects = RoleManager()

    type = ObjectReferenceTypeField()
    to_workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('core.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('core.Card', on_delete=CASCADE, null=True, blank=True)

    member = models.ForeignKey('core.Member', on_delete=CASCADE)
    level = RoleLevelField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='roles_created')

    def __unicode__(self):
        return 'Role(' + str(self.id) + ') to:' + str(self.get_object()) + ' level:' + str(self.level)

    def save(self, *args, **kwargs):
        self.compute_type()
        return super(Role, self).save(*args, **kwargs)
