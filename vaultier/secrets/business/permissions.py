from rest_framework.permissions import BasePermission
from acls.business.fields import AclLevelField
from acls.business.permissions import has_object_acl


class CanManageSecretPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list':
            return has_object_acl(request.user, obj.card,
                                  AclLevelField.LEVEL_READ)
        else:
            # check permission to card
            return has_object_acl(request.user, obj.card,
                                  AclLevelField.LEVEL_WRITE)
