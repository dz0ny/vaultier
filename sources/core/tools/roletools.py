from core.tools.singleton import Singleton

_CACHE = {}

def cache_key(user, cls, id):
    return str(user.id)+'.'+cls.__name__+'.'+str(id)

def to_cache(user, cls, id, roles):
    if user and cls and id:
        key = cache_key(user,cls, id)
        _CACHE[key] = roles
    return None

def from_cache(user, cls, id):
    if user and cls and id:
        key = cache_key(user,cls, id)
        try:
            return _CACHE[key]
        except:
            pass

    return None

class RoleChecker(object):

    def get_parent_object(self, object, user):
        return object.get_parent_object()

    def get_roles(self, object, user):
        cached_roles = from_cache(user, object.__class__, object.id)

        if not cached_roles:
            roles = []
            for role in object.role_set.all():
                if (role.member.user == user):
                    roles.append(role)
            return roles
        else:
            return cached_roles

    def get_roles_and_parent_roles(self, object, user):
        roles = []
        if (object):
            roles = self.get_roles(object, user)

            cached_roles = from_cache(user, object.get_parent_object_class(), object.get_parent_object_id())
            if not cached_roles:
                parent_object = self.get_parent_object(object, user)
                parent_roles = self.get_roles_and_parent_roles(parent_object, user)
                roles.extend(parent_roles)
                to_cache(user, object.__class__, object.id, roles)
            else:
                roles.extend(cached_roles)

        return roles

class RoleSummarizer(object):

    def summarize_roles(self, roles):
        highest_level = None
        highest_role = None
        for role in roles:
            if (role.level > highest_level):
                highest_level = role.level
                highest_role = role

        return highest_role