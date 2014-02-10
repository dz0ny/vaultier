from django.db import models
from six import string_types
from modelext.changes.changes import post_change, INSERT, UPDATE, SOFT_DELETE

manipulators = {}


def factory_manipulator(version, manipulator_id):
    if version.manipulator_id:
        cls = get_manipulator_class(version.manipulator_id)
        version.manipulator_id = manipulator_id
    else:
        cls = get_manipulator_class(manipulator_id)
        version.manipulator_id = manipulator_id

    return cls(manipulator_id, version)

def get_manipulator_class(id):
    if manipulators.has_key(id):
        cls = manipulators[id]
    else:
        raise AttributeError('manipulator class for "{name}" not found'.format(name=value))
    return cls

def register_manipulator_signal(manipulator_id=None, required_fields=None, required_sender=None, required_event_type=None):
    def callback(signal=None, sender=None, instance=None, event_type=None, saved_values=None, **kwargs):
        saved_keys = saved_values.keys()

        if event_type == required_event_type:
            intersection = {}
            if required_fields and set(saved_keys).intersection(required_fields):
                # required fields specified, intersection only required fields
                for saved_key in saved_keys:
                    if saved_key in required_fields:
                        intersection[saved_key] = saved_values[saved_key]
            else:
                # no required fields specifed, intersection is whole save state
                intersection = saved_values

            from vaultier.models.version.model import Version

            version = Version(versioned=instance)
            manipulator = factory_manipulator(version, manipulator_id)
            manipulator.store_state(intersection)
            manipulator.save()

    post_change.connect(callback, sender=required_sender, weak=False)


def register_manipulator_class(name, cls):
    manipulators[name] = cls


class VersionManipulatorIdField(models.CharField):
    def __init__(self, *args, **kwargs):
        self.name = "VersionManipulatorIdField",
        self.null = False
        self.max_length = 255
        self.default = None
        super(VersionManipulatorIdField, self).__init__(*args, **kwargs)


class VersionManipulator(object):
    version = None
    action_name = 'action'
    action_id = 0

    def __init__(self, id, version, **kwargs):
        self.id = id
        self.version = version
        self.version.manipulator_cls = self.id
        super(VersionManipulator, self).__init__(**kwargs);

    def determine_action_name(self):
        return self.action_name;

    def determine_versioned_parent(self):
        return self.version.versioned.get_parent_object()

    def determine_action_id(self):
        return self.action_id

    def store_state(self, data):
        self.version.revert_data = data
        self.version.revert_repr = str(self.version.versioned)
        self.version.revert_fields = data.keys()

        self.version.action_name = self.determine_action_name()
        self.version.action_id = self.determine_action_id();
        self.version.versioned_parent = self.determine_versioned_parent()

    def get_diff(self):
        result = {}
        version = self.version
        versioned = self.version.versioned
        if (self.can_revert()):
            for field in version.revert_fields:
                result[field] = {
                    'from': getattr(versioned, field),
                    'to': version.revert_data[field],
                }
        return result

    def save(self):
        return self.version.save()

    def revert(self):
        pass

    def can_revert(self):
        return True


class ModelCreatedManipulator(VersionManipulator):
    action_name = 'created'
    action_id = INSERT

    def store_state(self, data):
        super(ModelCreatedManipulator, self).store_state(data);
        self.version.revert_fields = {}
        self.version.revert_data = {}

    def can_revert(self):
        return False


class ModelUpdatedManipulator(VersionManipulator):
    action_name = 'updated'
    action_id = UPDATE


class ModelDeletedManipulator(VersionManipulator):
    action_name = 'deleted'
    action_id = SOFT_DELETE
