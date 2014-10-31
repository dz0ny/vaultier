from django.db.models.loading import get_model
from cards.models import Card
from libs.version.condition import RequiredFieldEventCondition
from libs.changes.changes import SOFT_DELETE, INSERT, UPDATE
from libs.version.manipulator import register_manipulator_signal, \
    ModelCreatedManipulator, ModelUpdatedManipulator, \
    ModelSoftDeletedManipulator, register_manipulator_class, \
    ModelMovedManipulator


def register_signals():
    register_manipulator_class('card_created_manipulator',
                               ModelCreatedManipulator)
    register_manipulator_class('card_updated_manipulator',
                               ModelUpdatedManipulator)
    register_manipulator_class('card_deleted_manipulator',
                               ModelSoftDeletedManipulator)
    register_manipulator_class('card_moved_manipulator',
                               ModelMovedManipulator)

    version_model = get_model('versions', 'Version')

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='card_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Card,
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='card_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Card,
            required_fields=['name', 'description'],
            required_event=UPDATE,
        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='card_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Card,
            required_fields=None,
            required_event=INSERT,
        )
    )

    register_manipulator_signal(
        version_cls=version_model,
        manipulator_id='card_moved_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Card,
            required_fields=['vault_id'],
            required_event=UPDATE,
        )
    )
