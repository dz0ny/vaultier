from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission

class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated():
            return True

        raise PermissionDenied(detail="Anonymous access denied")