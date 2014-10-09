from django.db.models.loading import get_model
from django.db.models.manager import Manager
from django.db.models.query_utils import Q
from accounts.business.fields import MemberStatusField
from acls.business.fields import AclLevelField
from libs.changes.changes import INSERT
from vaults.models import Vault
from acls.business.mailer import GrantedAccessMailer


class RoleManager(Manager):

    def on_model(self, signal=None, sender=None, instance=None,
                 event_type=None, **kwargs):
        if event_type == INSERT and \
                (instance.member.status == MemberStatusField.STATUS_MEMBER or
                 instance.member.status ==
                 MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY):
            self.send_granted_access(instance)

    def send_granted_access(self, instance):
        sender = GrantedAccessMailer(object=instance.get_object())
        sender.send()

    def all_for_member(self, member_id):
        member = get_model('workspaces', 'Member').objects.get(pk=member_id)
        return self.all_for_user(member.user)

    def all_for_user(self, user):
        # all workspaces user has permission write
        workspaces = get_model('workspaces', 'Workspace').objects.filter(
            acl__level=AclLevelField.LEVEL_READ,
            acl__user=user
        ).distinct()

        # all vaults user has permission read
        vaults = Vault.objects.filter(
            acl__level=AclLevelField.LEVEL_READ,
            acl__user=user
        ).distinct()

        # all cards user has permission read
        cards = get_model('cards', 'Card').objects.filter(
            acl__level=AclLevelField.LEVEL_READ,
            acl__user=user
        ).distinct()

        # all roles (to_workspace, to_vault, to_card) related to workspaces
        # in which user has permission to write
        roles = self.filter(
            Q(to_workspace__in=workspaces) | Q(to_vault__in=vaults) |
            Q(to_card__in=cards)
        ).distinct()

        return roles

    def create_or_update_role(self, role):
        existing = None
        try:
            existing = get_model('acls', 'Role').objects.filter(
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
