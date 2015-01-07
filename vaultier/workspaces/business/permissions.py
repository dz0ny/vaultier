from rest_framework.permissions import BasePermission
from accounts.models import Member
from acls.business.fields import AclLevelField
from acls.business.permissions import has_object_acl


class CanManageMemberPermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        member = Member.objects.to_node(request.user, obj)
        return obj.acl.has_permission('invite', member)


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
        return Member.objects.\
            all_to_transfer_keys(request.user).filter(id=obj.id).count() > 0
