from django.db.models.signals import post_save
from core.models import Acl
from core.models.acl_fields import AclDirectionField
from core.models.member_fields import MemberStatusField
from core.models.role_fields import RoleLevelField


def _on_role_post_save(sender, instance, created, **kwargs):
    if created and not instance.member.is_invitation():
        materializer = OnRoleCreateMaterializer(instance, instance.get_object())
        acls = materializer.materialize()

        saver = MaterializationSaver()
        saver.save_materialized(acls)
    if not created:
        materializer = onRoleUpdateMaterializer(instance)
        materializer.materialize()

def _on_member_post_save(sender, instance, created, **kwargs):
    if kwargs.get('update_fields', None):
        member = instance
        fields = kwargs.get('update_fields', [])
        if fields.count('status') and not member.is_invitation():
            acls = []
            for role in member.role_set.all():
                materializer = OnRoleCreateMaterializer(member, member.get_object())
                acls.extend(materializer.materialize())
            saver = MaterializationSaver()
            saver.save_materialized(acls)


def _on_object_post_save(sender, instance, created, **kwargs):
    if created:
        materializer = OnObjectCreateMaterializer(instance)
        acls = materializer.materialize()

        saver = MaterializationSaver()
        saver.save_materialized(acls)

def register_materializers():

    from core.models.role import Role
    post_save.connect(_on_role_post_save, sender=Role)

    from core.models.workspace import Workspace
    post_save.connect(_on_object_post_save, sender=Workspace)

    from core.models.vault import Vault
    post_save.connect(_on_object_post_save, sender=Vault)

    from core.models.card import Card
    post_save.connect(_on_object_post_save, sender=Card)

    from core.models.member import Member
    post_save.connect(_on_object_post_save, sender=Member)

class onRoleUpdateMaterializer(object):
    def __init__(self, role):
        self.role = role

    def materialize(self):
        Acl.objects.filter(role=self.role, direction=AclDirectionField.DIR_DOWN).update(level=self.role.level)

class OnObjectCreateMaterializer(object):
    def __init__(self, object):
        self.object = object

    def get_parent(self):
        object = self.object
        if object.__class__.__name__ == 'Vault':
            return object.workspace
        if object.__class__.__name__ == 'Card':
            return object.vault
        return None

    def materialize(self):
        acls = []

        # materialize parent roles, only in direction up to assure path to object will be available to users
        roles = self.find_parent_roles();
        for role in roles:
            materializer = OnRoleCreateMaterializer(role, role.get_object())
            acls.extend(materializer.materialize(AclDirectionField.DIR_UP))

        # materialize parent roles to current object and its children
        for role in roles:
            materializer = OnRoleCreateMaterializer(role, self.object)
            acls.extend(materializer.materialize(AclDirectionField.DIR_DOWN))

        return acls


    def find_parent_roles(self):
        roles = []
        roles.extend(self.object.role_set.all())

        parent = self.get_parent()
        if parent:
            materializer = OnObjectCreateMaterializer(parent)
            roles.extend(materializer.find_parent_roles())

        return roles


class OnRoleCreateMaterializer(object):
    role = None
    object = None

    def __init__(self, role, object):
        self.role = role
        self.object = object

    def acl_for_object(self, direction=None):
        if not self.role.member.user:
            raise RuntimeError(''
                               'Acl could be materialized upon conrete '
                               'member. Not the invited one without user set')

        acl = Acl()
        acl.role = self.role
        acl.direction = direction
        acl.user = self.role.member.user
        if direction == AclDirectionField.DIR_UP:
            acl.level = RoleLevelField.LEVEL_READ
        else:
            acl.level = self.role.level

        object = self.object
        if object.__class__.__name__ == 'Workspace':
            acl.to_workspace = object
        elif object.__class__.__name__ == 'Vault':
            acl.to_vault = object
        elif object.__class__.__name__ == 'Card':
            acl.to_card = object
        else:
            raise RuntimeError('Usupported ACL object: ' + object.__class__.__name__)

        return acl

    def get_parent(self):
        object = self.object
        if object.__class__.__name__ == 'Vault':
            return object.workspace
        if object.__class__.__name__ == 'Card':
            return object.vault
        return None

    def get_childs(self):
        object = self.object
        if object.__class__.__name__ == 'Workspace':
            return object.vault_set.all()
        if object.__class__.__name__ == 'Vault':
            return object.card_set.all()
        return []

    def materialize(self, direction=None):
        acls = []

        # materialize current
        if self.role.get_object() == self.object:
            acls.append(self.acl_for_object(AclDirectionField.DIR_DOWN))
        else:
            acls.append(self.acl_for_object(direction or AclDirectionField.DIR_DOWN))

        # materialize down
        if direction == None or direction == AclDirectionField.DIR_DOWN:
            childs = self.get_childs();
            for child in childs:
                materializer = OnRoleCreateMaterializer(self.role, child)
                acls.extend(materializer.materialize(AclDirectionField.DIR_DOWN))

        # materialize up
        if direction == None or direction == AclDirectionField.DIR_UP:
            parent = self.get_parent();
            if parent:
                materializer = OnRoleCreateMaterializer(self.role, parent)
                acls.extend(materializer.materialize(AclDirectionField.DIR_UP))

        return acls

class MaterializationSaver(object):

    def save_materialized(self, acls):
        saved = []

        # this should be optimized, not do million db qieries
        for acl in acls:
            try:
                existing = Acl.objects.get(
                    role=acl.role,
                    to_workspace=acl.to_workspace,
                    to_vault=acl.to_vault,
                    to_card=acl.to_card
                )

                # same acl found, so update existing, ignore same
                if existing.level < acl.level:
                    existing.level = acl.level
                    existing.save()
                    saved.append(existing)

            except Acl.DoesNotExist:
                # standard behaviour acl not found, so create new
                acl.save()
                saved.append(acl)

            except Acl.MultipleObjectsReturned:
                # more acl returned, this should not happen, so delete them and create new
                Acl.objects.filter(
                    role=acl.role,
                    to_workspace=acl.to_workspace,
                    to_vault=acl.to_vault,
                    to_card=acl.to_card
                ).delete()

                acl.save()
                saved.append(acl)

register_materializers()