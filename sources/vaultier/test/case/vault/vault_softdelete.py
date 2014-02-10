from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from vaultier.models.vault.model import Vault
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.tools.vault_api_tools import create_vault_api_call, delete_vault_api_call
from vaultier.test.case.workspace.workspace_tools import create_workspace_api_call

class VaultSoftDeleteTest(TransactionTestCase):

      def test_010_softdelete(self):

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

        delete_vault_api_call(user1token, vault.get('id'))

        vaults =Vault.objects.filter(id=vault.get('id'))
        self.assertEquals(vaults.count(), 0 )

        vaults =Vault.objects.include_deleted().filter(id=vault.get('id'))
        self.assertEquals(vaults.count(), 1 )


def vault_softdelete_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(VaultSoftDeleteTest))
    return suite