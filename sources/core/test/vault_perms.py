from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_403_FORBIDDEN
from core.models.member import Member
from core.models.role import Role
from core.models.workspace import Workspace
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.tools import format_response
from core.test.vault_tools import create_vault_api_call, delete_vault_api_call
from core.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call


class ApiVaultPermsTest(TransactionTestCase):

    def test_create_vault_in_workspace_without_role(self):

        # create user1
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create user2
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='Marcel').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        # user2 tries to create vault in workspace of user 2 which he has no access to
        response = create_vault_api_call(user2token, name="vault_in_workspace", workspace=workspace.get('id'))
        self.assertEqual(
           response.status_code,
           HTTP_403_FORBIDDEN,
           format_response(response)
        )

    def test_create_delete_vault_as_anonymous(self):

        # create user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id'))


        #create vault as anonymous
        response = create_vault_api_call(None, name="vault_in_workspace", workspace=workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        #delete vault as anonymous
        response = delete_vault_api_call(None, vault.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )


def vault_perms_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiVaultPermsTest))
    return suite