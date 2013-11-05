from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_403_FORBIDDEN, HTTP_200_OK, HTTP_204_NO_CONTENT
from core.models.member import Member
from core.models.role import Role
from core.models.workspace import Workspace
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.tools import format_response
from core.test.vault_tools import create_vault_api_call, delete_vault_api_call
from core.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call


class ApiVaultTest(TransactionTestCase):

    def test_create_vault(self):

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


    def test_delete_vault(self):

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


def vault_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiVaultTest))
    return suite