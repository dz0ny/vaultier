from rest_framework import permissions


class NodePermission(permissions.BasePermission):
    """
    Prepared permissions for Nodes. Returning True only at this point.
    """
    def has_permission(self, request, view):
        """
        Grant permission
        """
        parent = view.kwargs.get('parent')

        if view.action == "list" and parent:
            return parent.acl.has_permission('read', request.user)
        return True

    def has_object_permission(self, request, view, obj):
        """
        Grant object permission
        """
        print request.user.pk
        if view.action == "retrieve":
            return obj.acl.has_permission('read', request.user)

        if view.action in ('update', 'partial_update'):
            return obj.acl.has_permission('update', request.user)
