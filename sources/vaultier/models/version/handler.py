from django.db import models
from six import string_types
from modelext.changes.changes import post_change, INSERT, UPDATE, SOFT_DELETE

handlers = {}


def factory_handler(version, default_handler_cls):
    if version.handler_cls:
        return version.handler_cls(version)
    else:
        version.handler_cls = default_handler_cls
        return default_handler_cls(version)


def register_handler_signal(handler=None, required_fields=None, required_sender=None, required_event_type=None):
    handler_cls = handlers.get(handler)

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
            handler = factory_handler(version, handler_cls)
            handler.store_state(intersection)
            version.save()

    post_change.connect(callback, sender=required_sender, weak=False)


def register_handler_class(name, cls):
    handlers[name] = cls


class VersionHandlerClassField(models.CharField):
    description = "Field representing python class"
    __metaclass__ = models.SubfieldBase

    def __init__(self, *args, **kwargs):
        self.name = "PythonClassField",
        self.max_length = 255
        self.default = None
        super(VersionHandlerClassField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if value in ( None, ''):
            return None

        if not isinstance(value, string_types):
            return value

        else:
            cls = None
            if handlers.has_key(value):
                cls = handlers[value]
            else:
                raise AttributeError('handler class for "{name}" not found'.format(name=value))
            return cls

    def get_prep_value(self, value):
        if value:
            for key in handlers:
                if value == handlers[key]:
                    return key
        else:
            return None


    def get_internal_type(self):
        return 'CharField'

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_prep_value(value)


class VersionHandler(object):
    version = None
    action_name = 'action'
    action_id = 0

    def __init__(self, version, **kwargs):
        self.version = version
        super(VersionHandler, self).__init__(**kwargs);

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

    def revert(self):
        pass

    def can_revert(self):
        return True


class ModelCreatedHandler(VersionHandler):
    action_name = 'created'
    action_id = INSERT

    def store_state(self, data):
        super(ModelCreatedHandler, self).store_state(data);
        self.version.revert_fields = {}
        self.version.revert_data = {}

    def can_revert(self):
        return False


class ModelUpdatedHandler(VersionHandler):
    action_name = 'updated'
    action_id = UPDATE


class ModelDeletedHandler(VersionHandler):
    action_name = 'deleted'
    action_id = SOFT_DELETE
