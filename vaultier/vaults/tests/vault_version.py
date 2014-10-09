from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from libs.version.context import version_context_manager
from libs.version.manipulator import ACTION_CREATED, ACTION_UPDATED, \
    ACTION_SOFTDELETED
from versions.models import Version
from vaultier.test.tools.auth.api import auth_api_call, register_api_call
from vaultier.test.tools import AssertionsMixin
from vaultier.test.tools.vault.api import create_vault_api_call, \
    delete_vault_api_call, update_vault_api_call
from vaultier.test.tools.workspace.api import create_workspace_api_call


class VaultVersionTest(AssertionsMixin,  TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(True)

    def create_vault(self):
        # create user
        email = 'jan@rclick.cz'
        user1 = register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        # create vault
        vault = create_vault_api_call(
            user1token, workspace=workspace.get('id'), name='vault').data

        return user1, user1token, workspace, vault

    @unittest.skip("should be fixed asap")
    def test_vault_010_create(self):
        user1, user1token, workspace, vault = list(self.create_vault())

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
            'versioned_related_id': workspace.get('id'),
            'action_id': ACTION_CREATED
        })

        # assert user has been stored with version
        self.assertEqual(versions[0].created_by.id, user1.get('id'))

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'vault')
        self.assertEqual(versions[0].versioned_related_id, vault.get('id'))

    @unittest.skip("should be fixed asap")
    def test_vault_020_update(self):
        user1, user1token, workspace, vault = list(self.create_vault())

        vault = update_vault_api_call(
            user1token, vault.get('id'), name='renamed_vault',
            description="added_vault_description").data

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
            'name': 'vault',
            'description': None
        })

        vault = update_vault_api_call(
            user1token, vault.get('id'), name='renamed_vault_again',
            description="changed_vault_description").data

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

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'vault')
        self.assertEqual(versions[0].versioned_related_id, vault.get('id'))

    @unittest.skip("should be fixed asap")
    def test_vault_030_delete(self):
        user1, user1token, workspace, vault = list(self.create_vault())

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
        self.assert_dict(versions[0].revert_data, {'deleted_at': None})

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'workspace')
        self.assertEqual(versions[0].versioned_related_id, workspace.get('id'))


def vault_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        VaultVersionTest))
    return suite
