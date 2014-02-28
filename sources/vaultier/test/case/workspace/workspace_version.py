from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from modelext.version.manipulator import ACTION_CREATED, ACTION_UPDATED, ACTION_SOFTDELETED
from vaultier.models.version.model import Version
from vaultier.test.tools.auth.api import auth_api_call, register_api_call
from vaultier.test.tools import AssertionsMixin
from vaultier.test.tools.workspace.api import delete_workspace_api_call, update_workspace_api_call
from vaultier.test.tools.workspace.api import create_workspace_api_call

class WorkspaceVersionTest(AssertionsMixin,  TransactionTestCase):

    def create_workspace(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='workspace').data

        return (user1token, workspace,)

    def test_workspace_010_create(self):
        user1token,  workspace = list(self.create_workspace())

        #check version
        versions = Version.objects.filter(
            versioned_type__model='workspace',
            versioned_id=workspace.get('id')
        )

        # one version should be there
        self.assertEquals(versions.count(), 1)

        # compare version
        self.assert_model(versions[0], {
            'versioned_id': workspace.get('id'),
            'action_id': ACTION_CREATED
        })

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})

    def test_workspace_020_update(self):
        user1token,  workspace = list(self.create_workspace())

        workspace = update_workspace_api_call(user1token, workspace.get('id'),
                                      name='renamed_workspace',
                                      description="added_workspace_description"
        ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='workspace',
            versioned_id=workspace.get('id'),
            action_id=ACTION_UPDATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {
            'name': 'workspace',
            'description': None
        })

        workspace = update_workspace_api_call(user1token, workspace.get('id'),
                                      name='renamed_workspace_again',
                                      description="changed_workspace_description"
        ).data


        #check version
        versions = Version.objects.filter(
            versioned_type__model='workspace',
            versioned_id=workspace.get('id'),
            action_id=ACTION_UPDATED
        )

        # two versions should be there
        self.assertEquals(versions.count(), 2)

        # compare revision data
        self.assert_dict(versions[1].revert_data, {
            'name': 'renamed_workspace',
            'description': 'added_workspace_description'
        })

    def test_workspace_030_delete(self):
        user1token,  workspace = list(self.create_workspace())

        #check version
        versions = Version.objects.filter(
            versioned_type__model='workspace',
            versioned_id=workspace.get('id'),
            action_id=ACTION_CREATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        delete_workspace_api_call(user1token, workspace.get('id'))

        #check version
        versions = Version.objects.filter(
            versioned_type__model='workspace',
            versioned_id=workspace.get('id'),
            action_id=ACTION_SOFTDELETED
        )

        # two versions should be there, created and deleted
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {'deleted_at' : None})


def workspace_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(WorkspaceVersionTest))
    return suite