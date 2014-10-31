from rest_framework.permissions import BasePermission
from acls.business.fields import AclLevelField
from acls.business.permissions import has_object_acl


class CanManageCardPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action in ['retrieve', 'list']:
            return has_object_acl(request.user, obj, AclLevelField.LEVEL_READ)

        if view.action == 'destroy':
            # check permission to card
            return has_object_acl(request.user, obj, AclLevelField.LEVEL_WRITE)

        if view.action in ['create', 'update', 'partial_update']:
            result = True

            # check permission to card
            result = result and has_object_acl(request.user, obj,
                                               AclLevelField.LEVEL_WRITE)

            # check permission to vault
            result = result and has_object_acl(request.user, obj.vault,
                                               AclLevelField.LEVEL_WRITE)

            return result

        return False
