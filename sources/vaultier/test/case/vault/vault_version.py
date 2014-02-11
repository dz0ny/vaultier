from django.forms.models import model_to_dict
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from modelext.version.manipulator import ACTION_CREATED, ACTION_UPDATED, ACTION_SOFTDELETED
from vaultier.models.version.model import Version
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.tools import AssertionsMixin
from vaultier.test.tools.vault_api_tools import create_vault_api_call, delete_vault_api_call, update_vault_api_call
from vaultier.test.case.workspace.workspace_tools import create_workspace_api_call

class VaultVersionTest(AssertionsMixin,  TransactionTestCase):

    def test_vault_010_create(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(user1token,
                                      name="vault_in_workspace",
                                      workspace=workspace.get('id')
        ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='vault',
            versioned_id=vault.get('id')
        )

        # one version should be there
        self.assertEquals(versions.count(), 1)

        # compare version
        self.assert_model(versions[0], {
            'versioned_id': vault.get('id'),
            'versioned_parent_id': workspace.get('id'),
            'action_id': ACTION_CREATED
        })

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})

    def test_vault_020_update(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(user1token,
                                      name="vault_in_workspace",
                                      workspace=workspace.get('id')
        ).data

        vault = update_vault_api_call(user1token, vault.get('id'),
                                      name='renamed_vault',
                                      description="added_vault_description"
        ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='vault',
            versioned_id=vault.get('id'),
            action_id=ACTION_UPDATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {
            'name': 'vault_in_workspace',
            'description': None
        })

        vault = update_vault_api_call(user1token, vault.get('id'),
                                      name='renamed_vault_again',
                                      description="changed_vault_description"
        ).data


        #check version
        versions = Version.objects.filter(
            versioned_type__model='vault',
            versioned_id=vault.get('id'),
            action_id=ACTION_UPDATED
        )

        # two versions should be there
        self.assertEquals(versions.count(), 2)

        # compare revision data
        self.assert_dict(versions[1].revert_data, {
            'name': 'renamed_vault',
            'description': 'added_vault_description'
        })

    def test_vault_030_delete(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(user1token,
                                      name="vault_in_workspace",
                                      workspace=workspace.get('id')
        ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='vault',
            versioned_id=vault.get('id'),
            action_id=ACTION_CREATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        delete_vault_api_call(user1token, vault.get('id'))

        #check version
        versions = Version.objects.filter(
            versioned_type__model='vault',
            versioned_id=vault.get('id'),
            action_id=ACTION_SOFTDELETED
        )

        # two versions should be there, created and deleted
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})


def vault_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(VaultVersionTest))
    return suite