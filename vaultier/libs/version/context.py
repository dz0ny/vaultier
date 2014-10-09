
class Manager(object):
    _user = None
    _enabled = True
    _user_required = True

    def set_user_required(self, user_required):
        self._user_required = user_required

    def get_user_required(self):
        return self._user_required

    def set_user(self, user):
        self._user = user

    def get_user(self):
        if self._user_required and (not self._user or
                                    self._user.is_anonymous()):
            msg = 'To store version valid user is required on ' \
                  'version_context_manager'
            raise Exception(msg)
        return self._user

    def set_enabled(self, enabled):
        self._enabled = enabled

    def get_enabled(self):
        return self._enabled


version_context_manager = Manager()


class VersionContextAwareApiViewMixin(object):
    def initialize_request(self, request, *args, **kargs):
        request = super(VersionContextAwareApiViewMixin, self) \
            .initialize_request(request, *args, **kargs)
        version_context_manager.set_user(request.user)

        return request
