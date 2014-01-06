from vaultier.models import Acl
from vaultier.models.acl_fields import AclDirectionField, AclLevelField


class StandardAclStrategy(object):
    def acl_for_child(self, role, object ):
        acls = []

        acl = Acl()
        acl.set_object(object)
        acl.role = role
        acl.direction = AclDirectionField.DIR_UP
        acl.user = role.member.user
        acl.level = role.level

        acls.append(acl)

        return acls

    def acl_for_parent(self, role, object):
        acls = []

        acl = Acl()
        acl.set_object(object)
        acl.role = role
        acl.direction = AclDirectionField.DIR_UP
        acl.user = role.member.user
        acl.level = AclLevelField.LEVEL_READ

        acls.append(acl)

        return acls


    def acl_for_object(self, role, object):
        acls = []

        acl = Acl()
        acl.set_object(object)
        acl.role = role
        acl.direction = AclDirectionField.DIR_UP
        acl.user = role.member.user
        acl.level = role.level

        acls.append(acl)

        return acls

class CreateAclStrategy(object):
    def acl_for_child(self, object ):
        pass
    def acl_for_parent(self, object):
        pass
    def acl_for_object(self, object):
        pass