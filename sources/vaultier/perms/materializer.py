from vaultier.models import Acl
from vaultier.models.acl.fields import AclDirectionField
from vaultier.models.member.fields import MemberStatusField
from vaultier.models.role.fields import RoleLevelField
from vaultier.models.role.model import Role
from vaultier.perms.strategy import ReadAclStrategy, WriteAclStrategy, CreateAclStrategy


class CreateRoleMaterializer(object):
    role = None

    def __init__(self, role):
        self.role = role

    def get_strategy(self):
        strategy = None
        if (self.role.level == RoleLevelField.LEVEL_CREATE):
            strategy = CreateAclStrategy
        if (self.role.level == RoleLevelField.LEVEL_READ):
            strategy = ReadAclStrategy
        if (self.role.level == RoleLevelField.LEVEL_WRITE):
            strategy = WriteAclStrategy
        if (not strategy):
            raise  RuntimeError('Cannot find ACL strategy for role level'+str(self.role.level))
        return strategy()

    def acl_for_object(self, object, direction):

        if not self.role.member.user:
            raise RuntimeError(''
                               'Acl could be materialized upon conrete '
                               'member. Not the invited one without user set')

        strategy = self.get_strategy()

        if (direction == AclDirectionField.DIR_UP):
            return strategy.acl_for_parent(self.role, object)

        if (direction == AclDirectionField.DIR_DOWN):
            return strategy.acl_for_child(self.role, object)

        if (direction == AclDirectionField.DIR_CURRENT):
            return strategy.acl_for_object(self.role, object)

        raise  RuntimeError('Unknown ACL direction'+str(direction))

    def materialize_parents(self, object):
        acls = []
        parent = object.get_tree_iterator().get_parent_object()
        if parent:
            acls.extend(self.acl_for_object(parent, AclDirectionField.DIR_UP))
            acls.extend(self.materialize_parents(parent))
        return acls

    def materialize_childs(self, object):
        acls = []
        childs = object.get_tree_iterator().get_child_objects()
        for child in childs:
            acls.extend(self.acl_for_object(child, AclDirectionField.DIR_DOWN))
            acls.extend(self.materialize_childs(child))
        return acls

    def materialize_current(self, object):
        acls = []
        acls.extend(self.acl_for_object(object, AclDirectionField.DIR_CURRENT))
        return acls

    def materialize(self, object):
        acls = []

        # materialize current
        acls.extend(self.materialize_current(object))

        # materialize parent objects
        acls.extend(self.materialize_parents(object))

        # materialize child objects
        acls.extend(self.materialize_childs(object))

        # save materialized
        saver = MaterializationSaver()
        saver.save_materialized(acls)


class MaterializationSaver(object):
    def save_materialized(self, acls):
        saved = []

        # find existing acl
        # this should be optimized, not do million db queries
        for acl in acls:
            try:
                Acl.objects.get(
                    role=acl.role,
                    direction=acl.direction,
                    level=acl.level,
                    to_workspace=acl.to_workspace,
                    to_vault=acl.to_vault,
                    to_card=acl.to_card
                )

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


class UpdateRoleLevelMaterializer(object):
    def __init__(self, role):
        self.role = role

    def materialize(self):
        Acl.objects.filter(
            role=self.role
        ).delete()

        if (self.role.member.user):
            materializer = CreateRoleMaterializer(self.role)
            materializer.materialize(self.role.get_object())

class UpdateRoleMemberMaterializer(object):
    def __init__(self, role):
        self.role = role

    def materialize(self):
        Acl.objects.filter(
            role=self.role
        ).delete()

        materializer = CreateRoleMaterializer(self.role)
        materializer.materialize(self.role.get_object())


class UpdateMemberUserMaterializer(object):
    def __init__(self, member):
        self.member = member

    def materialize(self):
        member = self.member
        for role in member.role_set.all():
            # first delete old acls
            Acl.objects.filter(
                role=role,
            ).delete()

            # materialize
            materializer = CreateRoleMaterializer(role)
            materializer.materialize(role.get_object())


class InsertedObjectMaterializer(object):
    def __init__(self, object):
        self.object = object

    # adds WRITE role for object created by user which have CREATE role to parent object
    def materialize_role(self):
        parent = self.object.get_tree_iterator().get_parent_object()
        if parent:
            for parent_role in parent.role_set.all():
                if (parent_role.member.user and parent_role.member.user.id == self.object.created_by.id):
                    if (parent_role.level == RoleLevelField.LEVEL_CREATE):
                        role = Role()
                        role.member = parent_role.member
                        role.created_by = role.member.user
                        role.level = RoleLevelField.LEVEL_WRITE
                        role.set_object(self.object)
                        role.save()

    # materialize roles
    def materialize(self):
        parent = self.object.get_tree_iterator().get_parent_object()
        roles = []
        acls = []

        while parent:
            for role in parent.role_set.all():
                roles.append(role)
            parent = parent.get_tree_iterator().get_parent_object()

        for role in roles:
            if not role.member.status == MemberStatusField.STATUS_INVITED:
                rm = CreateRoleMaterializer(role);
                acls.extend(rm.materialize_childs(role.get_object()))

        # save materialized
        saver = MaterializationSaver()
        saver.save_materialized(acls)

class MovedObjectMaterializer(object):
    def __init__(self, object):
        self.object = object

    def materialize(self):
        # delete all acls related to object
        self.object.acl_set.all().delete()

        # delete all acls related to object roles, including acls of previous parents
        Acl.objects.filter(role__in=self.object.role_set.all()).delete()

        # object previous acl are now cleared
        # rematerialize object as inserted
        m = InsertedObjectMaterializer(self.object)
        m.materialize()
