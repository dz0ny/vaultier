from vaultier.models.version.model import Version


class VersionHandler(object):

    version = None

    def __init__(self, version, **kwargs):
        self.version = version
        super(VersionHandler, self).__init__(**kwargs);

    def serialize(self, versioned, fields=None):
        d = {}
        if fields:
            for key in fields:
               d[key]  = getattr(versioned, key, None)
        return d

    def create_version(self, fields=None):
        version = self.version

        version.action = 0
        version.action_name = 'action'
        version.builder_cls = self.__module__ + "." + self.__class__.__name__
        version.object_fields = fields
        version.object_data = self.serialize(version.versioned, fields=fields)
        version.object_repr = str(version.versioned)
        version.versioned_parent = version.versioned

        return version

    def get_reverted(self):
        # returns reverted instance of object with reverted values set
        pass

    def can_revert(self):
        pass

