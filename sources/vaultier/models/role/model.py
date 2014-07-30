from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from django.db.models.query_utils import Q
from vaultier.models.acl.fields import AclLevelField
from vaultier.models.card.model import Card
from vaultier.models.member.fields import MemberStatusField
from vaultier.models.role.fields import RoleLevelField
from vaultier.models.vault.model import Vault
from modelext.changes.changes import ChangesMixin, INSERT, post_change
from vaultier.mailer.granted_access.sender import GrantedAccessEmailSender
from vaultier.models.object_reference import ObjectReference, ObjectReferenceTypeField


class RoleManager(Manager):
    def on_model(self, signal=None, sender=None, instance=None, event_type=None, **kwargs):
        if event_type == INSERT and \
                (instance.member.status == MemberStatusField.STATUS_MEMBER or
                 instance.member.status == MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY):
            self.send_granted_access(instance)

    def send_granted_access(self, instance):
        sender = GrantedAccessEmailSender(instance.get_object())
        sender.send()

    def all_for_member(self, member_id):
        from vaultier.models.member.model import Member
        member = Member.objects.get(pk=member_id)

        return self.all_for_user(member.user).filter(member=member)

    def all_for_user(self, user):
        from vaultier.models.workspace.model import Workspace

        # all workspaces user has permission write
        workspaces = Workspace.objects.filter(
            acl__level=AclLevelField.LEVEL_READ,
            acl__user=user
        ).distinct()

        # all vaults user has permission read
        vaults = Vault.objects.filter(
            acl__level=AclLevelField.LEVEL_READ,
            acl__user=user
        ).distinct()

        # all cards user has permission read
        cards = Card.objects.filter(
            acl__level=AclLevelField.LEVEL_READ,
            acl__user=user
        ).distinct()


        # all roles (to_workspace, to_vault, to_card) related to workspaces in which user has permission to write
        roles = self.filter(
            Q(to_workspace__in=workspaces) | Q(to_vault__in=vaults) | Q(to_card__in=cards)
        ).distinct()

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


class Role(ChangesMixin, ObjectReference, models.Model):
    class Meta:
        db_table = u'vaultier_role'
        app_label = 'vaultier'

    objects = RoleManager()

    type = ObjectReferenceTypeField()
    to_workspace = models.ForeignKey('vaultier.Workspace', on_delete=CASCADE, null=True, blank=True)
    to_vault = models.ForeignKey('vaultier.Vault', on_delete=CASCADE, null=True, blank=True)
    to_card = models.ForeignKey('vaultier.Card', on_delete=CASCADE, null=True, blank=True)

    member = models.ForeignKey('vaultier.Member', on_delete=CASCADE)
    level = RoleLevelField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT, related_name='roles_created')

    def save(self, *args, **kwargs):
        self.compute_type()
        return super(Role, self).save(*args, **kwargs)


def register_signals():
    post_change.connect(Role.objects.on_model, sender=Role)
