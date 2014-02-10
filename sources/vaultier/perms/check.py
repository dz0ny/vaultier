
def has_object_acl(user, object, level):
    if not object:
        raise RuntimeError('Cannot check acl level for object None')

    # newly created one, always allow. Permissions are determined by related objects in higher code leves
    if not object.id:
        return True

    # existing object, check acls
    for acl in object.acl.all():
        if (acl.level == level and acl.user == user):
            return True