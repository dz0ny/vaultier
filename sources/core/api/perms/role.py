from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission
from core.models.role import Role
from core.models.role_fields import RoleLevelField


class CanManageRole(BasePermission):
    def has_object_permission(self, request, view, role):
        #due to some bug in rest framework request is ModelViewSet
        request = view.request

        workspace = role.get_object().get_root_object()

        result = Role.objects.filter(
            to_workspace=workspace,
            level=RoleLevelField.LEVEL_WRITE,
            member__user=request.user
        ).count() > 0

        return result