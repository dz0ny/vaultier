from rest_framework.permissions import BasePermission
from acls.business.fields import AclLevelField


def has_object_acl(user, object, level):
    if not object:
        raise RuntimeError('Cannot check acl level for object None')

    # newly created one, always allow. Permissions are determined by
    # related objects in higher code leves
    if not object.id:
        return True

    # existing object, check acls
    for acl in object.acl_set.all():
        if acl.level == level and acl.user == user:
            return True


class CanManageRolePermission(BasePermission):
    def has_object_permission(self, request, view, role):

        object = role.get_object()
        result = has_object_acl(request.user, object,
                                AclLevelField.LEVEL_WRITE)

        return result
