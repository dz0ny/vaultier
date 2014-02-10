from vaultier.models.card.model import Card
from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.manipulator import  register_manipulator_signal, ModelCreatedManipulator, ModelUpdatedManipulator, ModelDeletedManipulator, register_manipulator_class, ModelMovedManipulator

register_manipulator_class('card_created_manipulator', ModelCreatedManipulator)
register_manipulator_class('card_updated_manipulator', ModelUpdatedManipulator)
register_manipulator_class('card_deleted_manipulator', ModelDeletedManipulator)
register_manipulator_class('card_moved_manipulator', ModelMovedManipulator)

def register_signals():
    from vaultier.models.version.model import Version

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Card,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        manipulator_id='card_deleted_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Card,
        required_fields=['name', 'description'],
        required_event_type=UPDATE,
        manipulator_id='card_updated_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Card,
        required_fields=None,
        required_event_type=INSERT,
        manipulator_id='card_created_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Card,
        required_fields=['vault_id'],
        required_event_type=UPDATE,
        manipulator_id='card_moved_manipulator'
    )



