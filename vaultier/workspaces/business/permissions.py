from rest_framework.permissions import BasePermission
from accounts.business.fields import MemberStatusField
from accounts.models import Member
from acls.business.fields import AclLevelField
from acls.business.permissions import has_object_acl


class CanManageWorkspace(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == ['retrieve', 'list']:
            required_level = AclLevelField.LEVEL_READ
        else:
            required_level = AclLevelField.LEVEL_WRITE

        if not obj.pk:
            return True
        else:
            return has_object_acl(request.user, obj, required_level)


class CanManageWorkspaceKey(BasePermission):

    def has_object_permission(self, request, view, obj):

        return Member.objects.filter(
            user=request.user,
            status=MemberStatusField.STATUS_MEMBER).count() > 0
