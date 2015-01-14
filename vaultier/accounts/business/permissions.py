from rest_framework.permissions import BasePermission
from accounts.models import User, Member


class CanManageUserPermission(BasePermission):

    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        if request.user and request.user.is_authenticated():
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.id == obj.id


class LostKeyPermission(BasePermission):
    """
    Custom permission class based on view
    """

    def has_object_permission(self, request, view, obj):
        if view.action == 'create':
            return True
        else:
            return isinstance(request.user, User)

    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        else:
            return isinstance(request.user, User)


class CanManageMemberPermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        member = Member.objects.to_node(request.user, obj)
        return obj.acl.has_permission('invite', member)
