from rest_framework.permissions import BasePermission, IsAuthenticated
from accounts.business.fields import MemberStatusField
from accounts.models import Member


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


class CanManageWorkspaceKey(BasePermission):

    def has_object_permission(self, request, view, obj):

        return Member.objects.filter(
            user=request.user,
            status=MemberStatusField.STATUS_MEMBER).count() > 0
