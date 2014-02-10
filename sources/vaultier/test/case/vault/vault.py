from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.tools import format_response
from vaultier.test.tools.vault_api_tools import create_vault_api_call, delete_vault_api_call, list_vaults_api_call, retrieve_vault_api_call
from vaultier.test.workspace_tools import create_workspace_api_call


class ApiVaultTest(TransactionTestCase):


    def test_010_create_vault(self):

        # create user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        response = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

    def test_020_delete_vault(self):

        # create user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data

        #delete vault
        response = delete_vault_api_call(user1token, vault.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

    def test_030_list_vault(self):

        # create user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        response = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id'))

        #list vaults
        response = list_vaults_api_call(user1token, workspace=workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_040_retrieve_vault(self):

        # create user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data

        #list vaults
        response = retrieve_vault_api_call(user1token, vault.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )


def vault_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiVaultTest))
    return suite