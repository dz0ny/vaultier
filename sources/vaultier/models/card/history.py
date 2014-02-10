from vaultier.models.card.model import Card
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from vaultier.models.version.handler import  register_handler_signal, ModelCreatedHandler, ModelUpdatedHandler, ModelDeletedHandler, register_handler_class

register_handler_class('card_created_handler', ModelCreatedHandler)
register_handler_class('card_updated_handler', ModelUpdatedHandler)
register_handler_class('card_deleted_handler', ModelDeletedHandler)

def register_signals():

    register_handler_signal(
        required_sender=Card,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        handler='card_deleted_handler'
    )

    register_handler_signal(
        required_sender=Card,
        required_fields=['name', 'description'],
        required_event_type=UPDATE,
        handler='card_updated_handler'
    )

    register_handler_signal(
        required_sender=Card,
        required_fields=None,
        required_event_type=INSERT,
        handler='card_created_handler'
    )
