from django_mptt_acl.rules import DefaultRoleRule


class ManageRole(object):
    name = 'manage'
    permissions = ('read', 'update', 'delete', 'invite', 'create')

    required_permissions_ancestors = ('read',)
    required_permissions_descendants = permissions
    rules = (DefaultRoleRule,)