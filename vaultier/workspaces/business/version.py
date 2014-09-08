from django.db.models.loading import get_model
from libs.changes.changes import SOFT_DELETE, INSERT, UPDATE
from libs.version.condition import RequiredFieldEventCondition
from libs.version.manipulator import register_manipulator_signal, \
    ModelCreatedManipulator, ModelUpdatedManipulator, \
    ModelSoftDeletedManipulator, register_manipulator_class
from ..models import Workspace


class WorkspaceSoftDeletedManipulator(ModelSoftDeletedManipulator):
    """
    deleted workspace related is always workspace
    """
    def determine_versioned_related(self):
        return self.version.versioned


def register_signals():
    register_manipulator_class('workspace_created_manipulator',
                               ModelCreatedManipulator)
    register_manipulator_class('workspace_updated_manipulator',
                               ModelUpdatedManipulator)
    register_manipulator_class('workspace_deleted_manipulator',
                               WorkspaceSoftDeletedManipulator)

    version_cls = get_model('versions', 'Version')

    register_manipulator_signal(
        version_cls=version_cls,
        manipulator_id='workspace_deleted_manipulator',
        condition=RequiredFieldEventCondition(
            required_fields=['deleted_at'],
            required_event=SOFT_DELETE,
            required_sender=Workspace,
        ),
    )

    register_manipulator_signal(
        version_cls=version_cls,
        manipulator_id='workspace_updated_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Workspace,
            required_fields=['name', 'description'],
            required_event=UPDATE,
        ),
    )

    register_manipulator_signal(
        version_cls=version_cls,
        manipulator_id='workspace_created_manipulator',
        condition=RequiredFieldEventCondition(
            required_sender=Workspace,
            required_fields=None,
            required_event=INSERT,
        ),
    )
