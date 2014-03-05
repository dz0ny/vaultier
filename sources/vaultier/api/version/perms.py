from rest_framework.permissions import BasePermission
from vaultier.models.acl.fields import AclLevelField
from vaultier.perms.check import has_object_acl

class CanReadVersionedRelatedPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        result = has_object_acl(request.user, obj, AclLevelField.LEVEL_READ)
        return result

class CanReadVersionPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if not obj.versioned_related:
            return False

        result = has_object_acl(request.user, obj.versioned_related, AclLevelField.LEVEL_READ)
        return result
