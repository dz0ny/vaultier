from vaultier.models.secret.model import Secret
from modelext.version.manipulator import  register_manipulator_signal
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.manipulator import ModelCreatedManipulator, ModelUpdatedManipulator, ModelDeletedManipulator, register_manipulator_class

class SecretBlobUpdateManipulator(ModelUpdatedManipulator):
    def get_diff(self):
        return super(SecretBlobUpdateManipulator, self).get_diff(fields=['blob_meta'])

register_manipulator_class('secret_created_manipulator', ModelCreatedManipulator)
register_manipulator_class('secret_updated_manipulator', ModelUpdatedManipulator)
register_manipulator_class('secret_blob_updated_manipulator', SecretBlobUpdateManipulator)
register_manipulator_class('secret_deleted_manipulator', ModelDeletedManipulator)

def register_signals():
    from vaultier.models.version.model import Version

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Secret,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        manipulator_id='secret_deleted_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Secret,
        required_fields=['name', 'description', 'data'],
        required_event_type=UPDATE,
        manipulator_id='secret_updated_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Secret,
        required_fields=['blob_meta', 'blob_data'],
        required_event_type=UPDATE,
        manipulator_id='secret_blob_updated_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Secret,
        required_fields=None,
        required_event_type=INSERT,
        manipulator_id='vault_created_manipulator'
    )
