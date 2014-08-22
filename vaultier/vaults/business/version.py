from libs.version.condition import RequiredFieldEventCondition
from libs.version.manipulator import register_manipulator_signal
from libs.changes.changes import SOFT_DELETE, INSERT, UPDATE
from libs.version.manipulator import ModelCreatedManipulator, \
    ModelUpdatedManipulator, ModelSoftDeletedManipulator, \
    register_manipulator_class
from django.db.models.loading import get_model
from vaults.models import Vault


def register_signals():
    register_manipulator_class('vault_created_manipulator',
                               ModelCreatedManipulator)
    register_manipulator_class('vault_updated_manipulator',
                               ModelUpdatedManipulator)
    register_manipulator_class('vault_deleted_manipulator',
                               ModelSoftDeletedManipulator)

    version_cls = get_model('versions', 'Version')

    register_manipulator_signal(
        version_cls=version_cls,
        manipulator_id='vault_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Vault,
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
        )
    )

    register_manipulator_signal(
        version_cls=version_cls,
        manipulator_id='vault_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Vault,
            required_fields=['name', 'description'],
            required_event=UPDATE,
        )
    )

    register_manipulator_signal(
        version_cls=version_cls,
        manipulator_id='vault_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Vault,
            required_fields=None,
            required_event=INSERT,
        )
    )
