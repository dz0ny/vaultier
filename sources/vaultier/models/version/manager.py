from django.db.models import Manager


class VersionManager(Manager):

    def create_version(self, action_adapter_class, versioned, **kwargs ):
        adapter = action_adapter_class(self, versioned, **kwargs)
        adapter.create_version()

    def can_revert(self, version):
        return self.get_action_adapter(version).can_revert()

    def get_action_adapter(self, version):
        # decide action adapter by versioned and return instance
        pass

    def get_reverted(self, version):
        return self.get_action_adapter(version).get_reverted()