from modelext.version.condition import RequiredFieldEventCondition
from vaultier.models.secret.model import Secret
from modelext.version.manipulator import register_manipulator_signal, ModelMovedManipulator
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.manipulator import ModelCreatedManipulator, ModelUpdatedManipulator, ModelSoftDeletedManipulator, register_manipulator_class
from vaultier.models.version.model import Version


# Mixin ensures that secret related is always parent card
class SecretManipulatorMixin(object):
    def determine_versioned_related(self):
        return self.version.versioned.get_tree_iterator().get_parent_object();


# Mixin ensures that secret related is always parent card
class SecretCreatedManipulator(SecretManipulatorMixin, ModelCreatedManipulator):
    pass

# Mixin ensures that secret related is always parent card
class SecretUpdatedManipulator(SecretManipulatorMixin, ModelUpdatedManipulator):
    pass

# Mixin ensures that secret related is always parent card
class SecretSoftDeletedManipulator(SecretManipulatorMixin, ModelSoftDeletedManipulator):
    pass

# Mixin ensures that secret related is always parent card
# Also ensures all secret versions are moved to another card
class SecretMovedManipulator(SecretManipulatorMixin, ModelMovedManipulator):
    def save(self):
        super(SecretMovedManipulator, self).save();

        versions = Version.objects.filter(
            versioned_id=self.version.versioned.id,
            versioned_type__model='secret'
        )

        versions.update(
            versioned_related_id=self.version.versioned_related_id,
        )


# Overriden to ensure that state change stores blob filename
class SecretBlobUpdatedManipulator(SecretManipulatorMixin, ModelUpdatedManipulator):
    def store_state(self, revert_data, model):
        revert_data['blob_data'] = revert_data['blob_data'].name
        return super(SecretBlobUpdatedManipulator, self).store_state(revert_data, model)

    def get_diff(self):
        return super(SecretBlobUpdatedManipulator, self).get_diff(fields=['blob_meta'])


def register_signals():
    register_manipulator_class('secret_created_manipulator', SecretCreatedManipulator)
    register_manipulator_class('secret_updated_manipulator', SecretUpdatedManipulator)
    register_manipulator_class('secret_deleted_manipulator', SecretSoftDeletedManipulator)
    register_manipulator_class('secret_moved_manipulator', SecretMovedManipulator)
    register_manipulator_class('secret_blob_updated_manipulator', SecretBlobUpdatedManipulator)

    from vaultier.models.version.model import Version

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='secret_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
        )
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='secret_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['name', 'description', 'data'],
            required_event=UPDATE,

        )
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='secret_moved_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['card_id'],
            required_event=UPDATE,

        )
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='secret_blob_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['blob_meta', 'blob_data'],
            required_event=UPDATE,
        )
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='secret_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=None,
            required_event=INSERT,
        )
    )
