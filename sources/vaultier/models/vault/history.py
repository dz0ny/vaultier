from vaultier.models.vault.model import Vault
from vaultier.models.version.handler import  register_handler_signal
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from vaultier.models.version.handler import ModelCreatedHandler, ModelUpdatedHandler, ModelDeletedHandler, register_handler_class

register_handler_class('vault_created_handler', ModelCreatedHandler)
register_handler_class('vault_updated_handler', ModelUpdatedHandler)
register_handler_class('vault_deleted_handler', ModelDeletedHandler)

def register_signals():

    register_handler_signal(
        required_sender=Vault,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        handler='vault_deleted_handler'
    )

    register_handler_signal(
        required_sender=Vault,
        required_fields=['name', 'description'],
        required_event_type=UPDATE,
        handler='vault_updated_handler'
    )

    register_handler_signal(
        required_sender=Vault,
        required_fields=None,
        required_event_type=INSERT,
        handler='vault_created_handler'
    )
