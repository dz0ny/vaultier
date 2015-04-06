from rest_framework.permissions import BasePermission


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


class SuperUserPermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user and user.is_authenticated() and user.is_superuser:
            return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user and user.is_authenticated() and user.is_superuser:
            return True

