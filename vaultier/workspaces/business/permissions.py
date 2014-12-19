from rest_framework.permissions import BasePermission, IsAuthenticated
from accounts.models import Member
from acls.business.fields import AclLevelField
from acls.business.permissions import has_object_acl


class InvitationPermission(IsAuthenticated):
    
    def has_permission(self, request, view):
        """
        Everyone can see detail if has invitation_hash. The rest has
        to be authenticated

        :param request:
        :param view:
        :return:
        """
        if view.action == 'retrieve':
            return True
        else:
            return super(InvitationPermission, self).has_permission(
                request, view)
    

class CanManageMemberPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == 'destroy':
            workspace = obj.workspace
            return has_object_acl(request.user, workspace,
                                  AclLevelField.LEVEL_WRITE)

        return obj.node.acl.has_permission('invite', request.user)


class CanManageWorkspace(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action in ['retrieve', 'list']:
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
