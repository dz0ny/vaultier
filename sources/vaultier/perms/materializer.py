from vaultier.models import Acl
from vaultier.models.acl_fields import AclDirectionField
from vaultier.models.role_fields import RoleLevelField

class CreateRoleMaterializer(object):
    role = None

    def __init__(self, role):
        self.role = role

    def acl_for_object(self, object, direction=None):
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

        acl.set_object(object)

        return acl

    def materialize_parents(self, object):
        acls = []
        parent = object.get_parent_object()
        if parent:
            acls.append(self.acl_for_object(parent, AclDirectionField.DIR_UP))
            acls.extend(self.materialize_parents(parent))
        return acls

    def materialize_childs(self, object):
        acls = []
        childs = object.get_child_objects()
        for child in childs:
            acls.append(self.acl_for_object(child, AclDirectionField.DIR_DOWN))
            acls.extend(self.materialize_childs(child))
        return acls

    def materialize(self, object):
        acls = []

        # materialize current
        acls.append(self.acl_for_object(object, AclDirectionField.DIR_DOWN))

        # materialize child objects
        acls.extend(self.materialize_childs(object))

        # materialize parent objects
        acls.extend(self.materialize_parents(object))

        # save materialized
        saver = MaterializationSaver()
        saver.save_materialized(acls)



class MaterializationSaver(object):

    def save_materialized(self, acls):
        saved = []

        # this should be optimized, not do million db queries
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


class UpdateRoleLevelMaterializer(object):

    def __init__(self, role):
        self.role = role

    def materialize(self):
        Acl.objects.filter(
            role=self.role,
            direction=AclDirectionField.DIR_DOWN
        ).update(level=self.role.level)

class UpdateRoleMemberMaterializer(object):

    def __init__(self, role):
        self.role = role

    def materialize(self):
        Acl.objects.filter(
            role=self.role,
        ).update(user=self.role.member.user)

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

    def materialize(self):
        parent = self.object.get_parent_object()
        acls = []
        if parent:
            for acl in parent.acl_set.all():
                acl.id = None
                acl.set_object(self.object)
                acls.append(acl);

            # save materialized
            saver = MaterializationSaver()
            saver.save_materialized(acls)


