from rest_framework.fields import Field
from vaultier.models.acl.fields import AclLevelField


class PermsField(Field):
    read_only = True

    def get_acls(self, obj, user):
        acls = obj.acl.filter(
            user=user
        )
        return acls

    def field_to_native(self, obj, field_name):
        perms = {}

        user = self.context['request'].user
        acls = self.get_acls(obj, user)

        for acl in acls:
            if acl.level == AclLevelField.LEVEL_CREATE:
                perms['create'] = True
            if acl.level == AclLevelField.LEVEL_READ:
                perms['read'] = True
            if acl.level == AclLevelField.LEVEL_WRITE:
                perms['update'] = True
                perms['delete'] = True
                perms['create'] = True
                perms['invite'] = True
        return perms

