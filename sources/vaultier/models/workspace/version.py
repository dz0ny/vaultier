from modelext.changes.changes import SOFT_DELETE, INSERT, UPDATE
from modelext.version.manipulator import  register_manipulator_signal, ModelCreatedManipulator, ModelUpdatedManipulator, ModelDeletedManipulator, register_manipulator_class, ModelMovedManipulator
from vaultier.models.workspace.model import Workspace

def register_signals():
    register_manipulator_class('workspace_created_manipulator', ModelCreatedManipulator)
    register_manipulator_class('workspace_updated_manipulator', ModelUpdatedManipulator)
    register_manipulator_class('workspace_deleted_manipulator', ModelDeletedManipulator)

    from vaultier.models.version.model import Version

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Workspace,
        required_fields=['deleted_at'],
        required_event_type=SOFT_DELETE,
        manipulator_id='workspace_deleted_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Workspace,
        required_fields=['name', 'description'],
        required_event_type=UPDATE,
        manipulator_id='workspace_updated_manipulator'
    )

    register_manipulator_signal(
        version_cls=Version,
        required_sender=Workspace,
        required_fields=None,
        required_event_type=INSERT,
        manipulator_id='workspace_created_manipulator'
    )




