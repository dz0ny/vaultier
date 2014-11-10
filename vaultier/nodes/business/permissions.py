from rest_framework import permissions


class NodePermission(permissions.BasePermission):
    """
    Prepared permissions for Nodes. Returning True only at this point.
    """
    def has_permission(self, request, view):
        """
        Grant permission
        """
        return True

    def has_object_permission(self, request, view, obj):
        """
        Grant object permission
        """
        return True
