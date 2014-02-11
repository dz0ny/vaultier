from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from vaultier.models.workspace.model import Workspace
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.case.workspace.workspace_tools import create_workspace_api_call, delete_workspace_api_call


class VaultSoftDeleteTest(TransactionTestCase):

      def test_010_softdelete(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='workspace').data

        delete_workspace_api_call(user1token, workspace.get('id'))

        workspaces =Workspace.objects.filter(id=workspace.get('id'))
        self.assertEquals(workspaces.count(), 0 )

        workspaces =Workspace.objects.include_deleted().filter(id=workspace.get('id'))
        self.assertEquals(workspaces.count(), 1 )


def workspace_softdelete_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(VaultSoftDeleteTest))
    return suite