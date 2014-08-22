from rest_framework.permissions import BasePermission
from accounts.models import User


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
