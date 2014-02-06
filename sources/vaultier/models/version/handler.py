from vaultier.models.version.model import Version
from vaultier.tools.changes import post_change, INSERT


def factory_handler(version, default_handler_cls):
    if version.handler_cls:
        return version.handler_cls(version)
    else:
        version.handler_cls = default_handler_cls
        return default_handler_cls(version)


def register_handler( handler_cls=None, required_fields=None, required_sender=None, required_event_type=None):

    def callback(signal=None, sender=None, instance=None, event_type=None, **kwargs):
        changed_fields = instance.previous_changes().keys()
        oldstate = instance.old_state();
        prevstate = instance.previous_state();
        currstate = instance.current_state();

        if event_type == required_event_type and set(required_fields).issubset(changed_fields):
            handler = factory_handler(Version(versioned=instance))
            handler.store_changes(required_fields)
            handler.version.save()

    post_change.connect(callback, sender=required_sender, weak=False)


class VersionHandler(object):

    version = None

    def __init__(self, version, **kwargs):
        self.version = version
        super(VersionHandler, self).__init__(**kwargs);

    def determine_action_name(self):
        return 'action'

    def determine_versioned_parent(self):
        return self.version.versioned

    def determine_action_id(self):
        return 0

    def store_changes(self, fields):
        self.version.action_name = self.determine_action_name()
        self.version.action_id = self.determine_action_id();
        self.version.versioned_parent = self.determine_versioned_parent()
        self.version.object_data = self.serialize_object_data(fields)
        self.version.object_repr = str(self.version.versioned)
        self.version.object_fields = fields

    def serialize_object_data(self, fields):
        data = self.version.versioned.old_changes()
        serialized = {}
        if fields:
            for key in fields:
               serialized[key]  = getattr(data, key, None)
        return serialized

    def revert(self):
        pass

    def can_revert(self):
        pass

