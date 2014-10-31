from rest_framework.permissions import BasePermission
from acls.business.fields import AclLevelField
from acls.business.permissions import has_object_acl


class CanManageVaultPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list':
            return has_object_acl(request.user, obj, AclLevelField.LEVEL_READ)

        if view.action == 'destroy':
            return has_object_acl(request.user, obj, AclLevelField.LEVEL_WRITE)

        if view.action == 'create':
            # check permission to workspace
            return has_object_acl(
                request.user, obj.workspace, AclLevelField.LEVEL_WRITE) or \
                has_object_acl(request.user, obj.workspace,
                               AclLevelField.LEVEL_CREATE)

        if view.action == 'update' or view.action == 'partial_update':
            result = True
            # check permission to vault
            result = result and has_object_acl(request.user, obj,
                                               AclLevelField.LEVEL_WRITE)
            # check permission to workspace
            result = result and has_object_acl(request.user, obj.workspace,
                                               AclLevelField.LEVEL_WRITE)
            return result

        return False
