from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_204_NO_CONTENT
from accounts.tests.api import auth_api_call, register_api_call
from libs.version.context import version_context_manager
from vaultier.test.tools import format_response
from vaults.tests.api import create_vault_api_call, delete_vault_api_call, \
    list_vaults_api_call, retrieve_vault_api_call, update_vault_api_call
from workspaces.tests.api import create_workspace_api_call


class ApiVaultTest(TransactionTestCase):

    def create_vault(self):
        # create user
        email = 'jan@rclick.cz'
        user1 = register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='Workspace').data

        #create vault
        response = create_vault_api_call(
            user1token, name="vault_in_workspace",
            workspace=workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )
        vault = response.data

        return user1, user1token, workspace, vault

    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_create_vault(self):
        self.create_vault()

    def test_020_delete_vault(self):
        user1, user1token, workspace, vault = list(self.create_vault())

        #delete vault
        response = delete_vault_api_call(user1token, vault.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

    def test_030_list_vault(self):
        user1, user1token, workspace, vault = list(self.create_vault())

        #list vaults
        response = list_vaults_api_call(
            user1token, workspace=workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_040_retrieve_vault(self):
        user1, user1token, workspace, vault = list(self.create_vault())

        #list vaults
        response = retrieve_vault_api_call(user1token, vault.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    @unittest.skip("should be fixed asap")
    def test_050_move_vault_should_not_be_allowed(self):
        user1, user1token, workspace, vault = list(self.create_vault())
        response = update_vault_api_call(
            user1token, vault.get('id'), workspace=2, name="changed_name")
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # workspace should be unchanged
        self.assertEqual(
            response.data.get('workspace'),
            1,
            format_response(response)
        )


def vault_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiVaultTest))
    return suite
