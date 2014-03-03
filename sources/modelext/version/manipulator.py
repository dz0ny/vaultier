from modelext.changes.changes import post_change
from modelext.version.context import version_context_manager

ACTION_CREATED = 10
ACTION_UPDATED = 20
ACTION_MOVED = 30
ACTION_SOFTDELETED = 40
ACTION_DELETED = 50

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
        raise AttributeError('manipulator class for "{name}" not found'.format(name=id))
    return cls

def register_manipulator_signal(version_cls=None, manipulator_id=None, required_fields=None, required_sender=None, required_event_type=None):
    def callback(signal=None, sender=None, instance=None, event_type=None, saved_values=None, **kwargs):
        if version_context_manager.get_enabled():
            saved_keys = saved_values.keys()
            do_save = False

            if event_type == required_event_type:
                intersection = {}
                if required_fields:
                    if set(saved_keys).intersection(required_fields):
                        do_save = True
                        # required fields specified, intersection only required fields
                        for saved_key in saved_keys:
                            if saved_key in required_fields:
                                intersection[saved_key] = saved_values[saved_key]
                else:
                    # no required fields specifed, intersection is whole save state
                    do_save = True
                    intersection = saved_values

                if do_save:
                    version = version_cls(versioned=instance)
                    manipulator = factory_manipulator(version, manipulator_id)
                    manipulator.store_state(intersection, instance)
                    manipulator.save()

    post_change.connect(callback, sender=required_sender, weak=False)


def register_manipulator_class(name, cls):
    manipulators[name] = cls

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
        return self.version.versioned.get_tree_iterator().get_parent_object()

    def determine_action_id(self):
        return self.action_id

    def store_state(self, revert_data, model):
        self.version.revert_data = revert_data
        self.version.revert_fields = revert_data.keys()

        self.version.action_name = self.determine_action_name()
        self.version.action_id = self.determine_action_id();
        self.version.versioned_parent = self.determine_versioned_parent()
        self.version.created_by = version_context_manager.get_user()

    def get_diff(self, fields=None):
        result = {}
        version = self.version
        versioned = self.version.versioned
        if (self.can_revert()):
            if (fields):
                fields = set(version.revert_fields.keys()).intersection(fields)
            else:
                fields = version.revert_fields.keys()

            for field in fields:
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
    action_id = ACTION_CREATED

    def store_state(self, revert_data, model):
        super(ModelCreatedManipulator, self).store_state(revert_data, model);
        self.version.revert_fields = {}
        self.version.revert_data = {}

    def can_revert(self):
        return False


class ModelUpdatedManipulator(VersionManipulator):
    action_name = 'updated'
    action_id = ACTION_UPDATED

class ModelMovedManipulator(VersionManipulator):
    action_name = 'moved'
    action_id = ACTION_MOVED


class ModelDeletedManipulator(VersionManipulator):
    action_name = 'softdeleted'
    action_id = ACTION_SOFTDELETED
