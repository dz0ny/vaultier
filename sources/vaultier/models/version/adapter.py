class VersionActionAdapter(object):

    manager = None
    versioned = None

    def __init__(self, manager, version, **kwargs):
        self.manager = manager
        self.version = version
        super(VersionActionAdapter, self).__init__(**kwargs);

    def create_version(self):
        # extract changes from changes mixin
        pass

    def get_reverted(self):
        # returns reverted instance of object with reverted values set
        pass

    def can_revert(self):
        return self.version.versioned == None