from acls.business.fields import AclLevelField, AclDirectionField
from ...models import Acl


class ReadAclStrategy(object):
    def construct_acl(self, role, object):
        acl = Acl()
        acl.set_object(object)
        acl.role = role
        acl.user = role.member.user
        return acl

    def acl_for_child(self, role, object):
        acls = []

        acl = self.construct_acl(role, object)
        acl.direction = AclDirectionField.DIR_DOWN
        acl.level = AclLevelField.LEVEL_READ
        acls.append(acl)

        return acls

    def acl_for_parent(self, role, object):
        acls = []

        acl = self.construct_acl(role, object)
        acl.direction = AclDirectionField.DIR_UP
        acl.level = AclLevelField.LEVEL_READ
        acls.append(acl)

        return acls

    def acl_for_object(self, role, object):
        acls = []

        acl = self.construct_acl(role, object)
        acl.direction = AclDirectionField.DIR_CURRENT
        acl.level = AclLevelField.LEVEL_READ
        acls.append(acl)

        return acls


class WriteAclStrategy(ReadAclStrategy):
    def acl_for_child(self, role, object):
        acls = super(WriteAclStrategy, self).acl_for_child(role, object)

        acl = self.construct_acl(role, object)
        acl.direction = AclDirectionField.DIR_DOWN
        acl.level = AclLevelField.LEVEL_WRITE
        acls.append(acl)

        return acls

    def acl_for_object(self, role, object):
        acls = super(WriteAclStrategy, self).acl_for_object(role, object)

        acl = self.construct_acl(role, object)
        acl.direction = AclDirectionField.DIR_CURRENT
        acl.level = AclLevelField.LEVEL_WRITE
        acls.append(acl)

        return acls


class CreateAclStrategy(ReadAclStrategy):
    def acl_for_child(self, role, object):
        return []

    def acl_for_object(self, role, object):
        acls = super(CreateAclStrategy, self).acl_for_object(role, object)

        acl = self.construct_acl(role, object)
        acl.direction = AclDirectionField.DIR_CURRENT
        acl.level = AclLevelField.LEVEL_CREATE
        acls.append(acl)

        return acls
