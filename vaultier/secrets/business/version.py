from django.db.models.loading import get_model
from libs.version.condition import RequiredFieldEventCondition
from secrets.models import Secret
from libs.version.manipulator import register_manipulator_signal, \
    ModelMovedManipulator
from libs.changes.changes import SOFT_DELETE, INSERT, UPDATE
from libs.version.manipulator import ModelCreatedManipulator, \
    ModelUpdatedManipulator, ModelSoftDeletedManipulator, \
    register_manipulator_class
from versions.models import Version


class SecretManipulatorMixin(object):
    """
    Mixin ensures that secret related is always parent card
    """
    def determine_versioned_related(self):
        return self.version.versioned.get_tree_iterator().get_parent_object()


class SecretCreatedManipulator(SecretManipulatorMixin,
                               ModelCreatedManipulator):
    """
    Mixin ensures that secret related is always parent card
    """
    pass


class SecretUpdatedManipulator(SecretManipulatorMixin,
                               ModelUpdatedManipulator):
    """
    Mixin ensures that secret related is always parent card
    """
    pass


class SecretSoftDeletedManipulator(SecretManipulatorMixin,
                                   ModelSoftDeletedManipulator):
    """
    Mixin ensures that secret related is always parent card
    """
    pass


class SecretMovedManipulator(SecretManipulatorMixin, ModelMovedManipulator):
    """
    Mixin ensures that secret related is always parent card
    Also ensures all secret versions are moved to another card
    """
    def save(self):
        super(SecretMovedManipulator, self).save()

        versions = Version.objects.filter(
            versioned_id=self.version.versioned.id,
            versioned_type__model='secret'
        )

        versions.update(
            versioned_related_id=self.version.versioned_related_id,
        )


class SecretBlobUpdatedManipulator(SecretManipulatorMixin,
                                   ModelUpdatedManipulator):
    """
    Override to ensure that state change stores blob filename
    """
    def store_state(self, revert_data, model):
        revert_data['blob_data'] = revert_data['blob_data'].name
        return super(SecretBlobUpdatedManipulator, self).\
            store_state(revert_data, model)

    def get_diff(self):
        return super(SecretBlobUpdatedManipulator, self).\
            get_diff(fields=['blob_meta'])


def register_signals():
    register_manipulator_class('secret_created_manipulator',
                               SecretCreatedManipulator)
    register_manipulator_class('secret_updated_manipulator',
                               SecretUpdatedManipulator)
    register_manipulator_class('secret_deleted_manipulator',
                               SecretSoftDeletedManipulator)
    register_manipulator_class('secret_moved_manipulator',
                               SecretMovedManipulator)
    register_manipulator_class('secret_blob_updated_manipulator',
                               SecretBlobUpdatedManipulator)

    version_model = get_model('versions', 'Version')

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='secret_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='secret_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['name', 'description', 'data'],
            required_event=UPDATE,

        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='secret_moved_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['card_id'],
            required_event=UPDATE,

        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='secret_blob_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=['blob_meta', 'blob_data'],
            required_event=UPDATE,
        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='secret_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Secret,
            required_fields=None,
            required_event=INSERT,
        )
    )
