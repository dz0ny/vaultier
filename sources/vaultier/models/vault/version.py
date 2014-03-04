from modelext.version.condition import RequiredFieldEventCondition
from vaultier.models.vault.model import Vault
from modelext.version.manipulator import register_manipulator_signal
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.manipulator import ModelCreatedManipulator, ModelUpdatedManipulator, ModelSoftDeletedManipulator, register_manipulator_class


def register_signals():
    register_manipulator_class('vault_created_manipulator', ModelCreatedManipulator)
    register_manipulator_class('vault_updated_manipulator', ModelUpdatedManipulator)
    register_manipulator_class('vault_deleted_manipulator', ModelSoftDeletedManipulator)

    from vaultier.models.version.model import Version

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='vault_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Vault,
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
        )
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='vault_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Vault,
            required_fields=['name', 'description'],
            required_event=UPDATE,
        )
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='vault_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Vault,
            required_fields=None,
            required_event=INSERT,
        )
    )
