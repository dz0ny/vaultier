from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_403_FORBIDDEN, HTTP_200_OK, HTTP_204_NO_CONTENT
from vaultier.models.vault import Vault
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.card_tools import create_card_api_call, list_cards_api_call, retrieve_card_api_call
from vaultier.test.tools import format_response
from vaultier.test.vault_tools import create_vault_api_call, delete_vault_api_call, list_vaults_api_call, retrieve_vault_api_call, update_vault_api_call
from vaultier.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call
from vaultier.tools.changes import post_change


class VersionTest(TransactionTestCase):


    def test_010_current_user(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault and update vault
        vault_id = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data.get('id')
        update_vault_api_call(user1token, vault_id, name="renamed_vault_in_workspace");

        self.assertEquals(
            Vault.objects.all()[0].name,
            'renamed_vault_in_workspace'
        )





def version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(VersionTest))
    return suite