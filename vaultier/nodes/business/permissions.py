from rest_framework import permissions
from accounts.models import Member


def _has_membership(user, node):
    return Member.objects.filter(node=node.get_root(), user=user).exists()


class NodePermission(permissions.BasePermission):
    """
    Prepared permissions for Nodes. Returning True only at this point.
    """
    def has_permission(self, request, view):
        """
        Grant permission
        """
        parent = view.kwargs.get('parent') or view.kwargs.get('node')

        if view.action == "list" and parent:
            if not _has_membership(request.user, parent):
                return
            return parent.acl.has_permission('read', request.user)
        return True

    def has_object_permission(self, request, view, obj):
        """
        Grant object permission
        """
        print obj
        if not _has_membership(request.user, obj):
            return
        if view.action == "retrieve":
            return obj.acl.has_permission('read', request.user)

        if view.action in ('update', 'partial_update'):
            return obj.acl.has_permission('update', request.user)


class PolicyPermission(NodePermission):

    def has_object_permission(self, request, view, obj):

        node = view.kwargs.get('node')
        if not _has_membership(request.user, node):
            return

        if view.action == "retrieve":
            return node.acl.has_permission('read', request.user)

        if view.action in ('update', 'partial_update'):
            return node.acl.has_permission('update', request.user)