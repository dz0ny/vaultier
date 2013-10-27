from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission
from core.models import Acl
from core.models.acl_fields import AclLevelField

class CanInviteMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        #due to some bug in rest framework request is ModelViewSet
        request = view.request
        if not Acl.objects.has_acl(request.user, AclLevelField.LEVEL_WRITE, obj.workspace):
            raise PermissionDenied(detail='Access denied to \"' + type(obj).__name__ + '\"')

        return True