from django.db.models import Manager
from django.utils.importlib import import_module

class VersionManager(Manager):

    def create_version(self, action_adapter_class, versioned, **kwargs ):
        adapter = action_adapter_class(self, versioned, **kwargs)
        return adapter.create_version(**kwargs)

    def can_revert(self, version, **kwargs):
        return self.get_action_adapter(version).can_revert(**kwargs)

    def get_action_adapter(self, version,**kwargs):
        module_name, class_name = version.action_adapter.split(".");
        module = import_module(module_name);
        adapter_cls = getattr(module, class_name);
        return adapter_cls(self, version,**kwargs)

    def get_reverted(self, version,**kwargs):
        return self.get_action_adapter(version).get_reverted(**kwargs)