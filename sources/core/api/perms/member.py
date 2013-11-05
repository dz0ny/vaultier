from rest_framework.permissions import BasePermission
from core.models.role import Role
from core.models.role_fields import RoleLevelField


class CanInviteMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        #due to some bug in rest framework request is ModelViewSet
        request = view.request

        result = Role.objects.filter(
            to_workspace=obj.workspace,
            level=RoleLevelField.LEVEL_WRITE,
            member__user=request.user
        ).count() > 0

        return result