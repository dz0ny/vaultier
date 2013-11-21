from rest_framework.fields import Field
from core.models.role_fields import RoleLevelField

class PermsField(Field):
    read_only = True

    def get_acls(self, obj, user):
        acls = obj.acl_set.filter(
            user=user
        )
        return acls

    def field_to_native(self, obj, field_name):
        perms = {}

        user = self.context['request'].user
        acls = self.get_acls(obj, user)

        for acl in acls:
            if acl.level == RoleLevelField.LEVEL_READ:
                perms['read'] = True
            if acl.level == RoleLevelField.LEVEL_WRITE:
                perms['update'] = True
                perms['delete'] = True
                perms['create'] = True
                perms['read'] = True
                perms['invite'] = True
        return perms

