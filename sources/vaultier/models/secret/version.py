from modelext.version.condition import RequiredFieldEventCondition
from vaultier.models.secret.model import Secret
from modelext.version.manipulator import register_manipulator_signal, ModelMovedManipulator
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.manipulator import ModelCreatedManipulator, ModelUpdatedManipulator, ModelDeletedManipulator, register_manipulator_class


class SecretBlobUpdateManipulator(ModelUpdatedManipulator):
    def store_state(self, revert_data, model):
        revert_data['blob_data'] = revert_data['blob_data'].name
        return super(SecretBlobUpdateManipulator, self).store_state(revert_data, model)

    def get_diff(self):
        return super(SecretBlobUpdateManipulator, self).get_diff(fields=['blob_meta'])


def register_signals():
    register_manipulator_class('secret_created_manipulator', ModelCreatedManipulator)
    register_manipulator_class('secret_updated_manipulator', ModelUpdatedManipulator)
    register_manipulator_class('secret_deleted_manipulator', ModelDeletedManipulator)
    register_manipulator_class('secret_moved_manipulator', ModelMovedManipulator)
    register_manipulator_class('secret_blob_updated_manipulator', SecretBlobUpdateManipulator)

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
