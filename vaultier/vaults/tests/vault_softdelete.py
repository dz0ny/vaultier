from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from accounts.tests.api import register_api_call, auth_api_call
from libs.version.context import version_context_manager
from vaults.models import Vault
from vaults.tests.api import create_vault_api_call, delete_vault_api_call
from workspaces.tests.api import create_workspace_api_call, \
    delete_workspace_api_call


class VaultSoftDeleteTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def create_vault(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(
            user1token, name="vault_in_workspace",
            workspace=workspace.get('id')).data

        return user1token, workspace, vault

    def test_010_softdelete(self):
        # create user
        user1token, workspace, vault = list(self.create_vault())

        delete_vault_api_call(user1token, vault.get('id'))

        vaults = Vault.objects.filter(id=workspace.get('id'))
        self.assertEquals(vaults.count(), 0)

        vaults = Vault.objects.include_deleted().filter(id=vault.get('id'))
        self.assertEquals(vaults.count(), 1)

    def test_020_softdelete_workspace(self):

        user1token, workspace, vault = list(self.create_vault())

        delete_workspace_api_call(user1token, vault.get('id'))

        vaults = Vault.objects.filter(id=workspace.get('id'))
        self.assertEquals(vaults.count(), 0)

        cards = Vault.objects.include_deleted().filter(id=vault.get('id'))
        self.assertEquals(cards.count(), 1)


def vault_softdelete_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        VaultSoftDeleteTest))
    return suite
