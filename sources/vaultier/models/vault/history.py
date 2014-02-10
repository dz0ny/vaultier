from vaultier.models.vault.model import Vault
from vaultier.models.version.manipulator import  register_manipulator_signal
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from vaultier.models.version.manipulator import ModelCreatedManipulator, ModelUpdatedManipulator, ModelDeletedManipulator, register_manipulator_class

register_manipulator_class('vault_created_manipulator', ModelCreatedManipulator)
register_manipulator_class('vault_updated_manipulator', ModelUpdatedManipulator)
register_manipulator_class('vault_deleted_manipulator', ModelDeletedManipulator)

def register_signals():

    register_manipulator_signal(
        required_sender=Vault,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        manipulator_id='vault_deleted_manipulator'
    )

    register_manipulator_signal(
        required_sender=Vault,
        required_fields=['name', 'description'],
        required_event_type=UPDATE,
        manipulator_id='vault_updated_manipulator'
    )

    register_manipulator_signal(
        required_sender=Vault,
        required_fields=None,
        required_event_type=INSERT,
        manipulator_id='vault_created_manipulator'
    )
