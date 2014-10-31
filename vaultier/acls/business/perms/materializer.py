from accounts.business.fields import MemberStatusField
from acls.business.fields import RoleLevelField, AclDirectionField
from acls.models import Acl, Role
from acls.business.perms.strategy import ReadAclStrategy, WriteAclStrategy, \
    CreateAclStrategy


class CreateRoleMaterializer(object):
    role = None

    def __init__(self, role):
        self.role = role

    def get_strategy(self):
        strategy = None
        if self.role.level == RoleLevelField.LEVEL_CREATE:
            strategy = CreateAclStrategy
        if self.role.level == RoleLevelField.LEVEL_READ:
            strategy = ReadAclStrategy
        if self.role.level == RoleLevelField.LEVEL_WRITE:
            strategy = WriteAclStrategy
        if not strategy:
            raise RuntimeError('Cannot find ACL strategy for role level {}'.
                               format(self.role.level))
        return strategy()

    def acl_for_object(self, object, direction):

        if not self.role.member.user:
            raise RuntimeError(''
                               'Acl could be materialized upon conrete '
                               'member. Not the invited one without user set')

        strategy = self.get_strategy()

        if direction == AclDirectionField.DIR_UP:
            return strategy.acl_for_parent(self.role, object)

        if direction == AclDirectionField.DIR_DOWN:
            return strategy.acl_for_child(self.role, object)

        if direction == AclDirectionField.DIR_CURRENT:
            return strategy.acl_for_object(self.role, object)

        raise RuntimeError('Unknown ACL direction {}'.format(direction))

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

        # find existing acls
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
                # standard behaviour acls not found, so create new
                acl.save()
                saved.append(acl)

            except Acl.MultipleObjectsReturned:
                # more acls returned, this should not happen, so delete them
                # and create new
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

        if self.role.member.user:
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
    """
    Materializes acls for just inserted object
    """
    def __init__(self, object):
        self.object = object

    def materialize_role(self):
        """
        adds WRITE role for objects created by user based of parent
        CREATE roles
        """
        parent = self.object.get_tree_iterator().get_parent_object()
        while parent:
            for parent_role in parent.role_set.all():
                if parent_role.member.user and \
                   parent_role.member.user.id == self.object.created_by.id and\
                   parent_role.level == RoleLevelField.LEVEL_CREATE:
                        role = Role()
                        role.member = parent_role.member
                        role.created_by = role.member.user
                        role.level = RoleLevelField.LEVEL_WRITE
                        role.set_object(self.object)
                        role.save()
                        return

            parent = parent.get_tree_iterator().get_parent_object()

    # materialize roles
    def materialize(self):
        parent = self.object.get_tree_iterator().get_parent_object()
        roles = []
        acls = []

        # collect all parent roles
        while parent:
            for role in parent.role_set.all():
                roles.append(role)
            parent = parent.get_tree_iterator().get_parent_object()

        # rematerialize all childs roles including
        # rematerialization on current child
        for role in roles:
            if not role.member.status == MemberStatusField.STATUS_INVITED:
                rm = CreateRoleMaterializer(role)
                acls.extend(rm.materialize_childs(role.get_object()))

        # save materialized
        saver = MaterializationSaver()
        saver.save_materialized(acls)

        # rematerialize roles in role_set of object
        for role in self.object.role_set.all():
            rm = CreateRoleMaterializer(role)
            rm.materialize(self.object)


class MovedObjectMaterializer(object):
    def __init__(self, object):
        self.object = object

    def materialize(self):
        # delete all acls related to object
        self.object.acl_set.all().delete()

        # delete all acls related to object roles,
        # including acls of previous parents
        Acl.objects.filter(role__in=self.object.role_set.all()).delete()

        # object previous acls are now cleared
        # rematerialize object as newly created
        m = InsertedObjectMaterializer(self.object)
        m.materialize()
