from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.condition import RequiredFieldEventCondition
from modelext.version.manipulator import register_manipulator_signal, ModelCreatedManipulator, ModelUpdatedManipulator, ModelDeletedManipulator, register_manipulator_class, ModelMovedManipulator
from vaultier.models.workspace.model import Workspace


def register_signals():
    register_manipulator_class('workspace_created_manipulator', ModelCreatedManipulator)
    register_manipulator_class('workspace_updated_manipulator', ModelUpdatedManipulator)
    register_manipulator_class('workspace_deleted_manipulator', ModelDeletedManipulator)

    from vaultier.models.version.model import Version

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='workspace_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
            required_sender=Workspace,
        ),
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='workspace_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Workspace,
            required_fields=['name', 'description'],
            required_event=UPDATE,
        ),
    )

    register_manipulator_signal(
        version_cls=Version,
        manipulator_id='workspace_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Workspace,
            required_fields=None,
            required_event=INSERT,
        ),
    )




