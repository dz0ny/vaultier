# Role checker does many selects now, as it is iterating many objects
# Some cache system has to be implemented
class RoleChecker(object):

    cache = None

    def __init__(self, *args, **kwargs):
        super(RoleChecker, self).__init__(*args, **kwargs)
        self.cache = DummyRoleCheckerCache()


    def get_roles(self, object, user):
        cached_roles = self.cache.from_cache(user, object.__class__, object.id)

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

            cached_roles = self.cache.from_cache(user, object.get_parent_object_class(), object.get_parent_object_id())
            if not cached_roles:
                parent_object = object.get_parent_object()
                parent_roles = self.get_roles_and_parent_roles(parent_object, user)
                roles.extend(parent_roles)
                self.cache.to_cache(user, object.__class__, object.id, roles)
            else:
                roles.extend(cached_roles)

        return roles

class DummyRoleCheckerCache(object):

    # should be caled on delete role signal, to keep cache up to date
    def remove_role_from_cache(self, role_id):
        pass

    # should be called on role update signal to keep cache up to date
    def replace_role_in_cache(self, role_id, role):
        pass

    def cache_key(self, user, cls, id):
        pass

    def to_cache(self, user, cls, id, roles):
        pass
        #if not self.cache: self.cache={}
        #if user and cls and id:
        #    key = self.cache_key(user,cls, id)
        #    self.cache[key] = roles
        #return None

    def from_cache(self, user, cls, id):
        pass
        #if not self.cache: self.cache={}
        #if user and cls and id:
        #    key = self.cache_key(user,cls, id)
        #    try:
        #        return self.cache[key]
        #    except:
        #        pass
        #
        #return None
