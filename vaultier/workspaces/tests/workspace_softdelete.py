from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from accounts.tests.api import register_api_call, auth_api_call
from libs.version.context import version_context_manager
from workspaces.models import Workspace
from workspaces.tests.api import create_workspace_api_call, \
    delete_workspace_api_call


class VaultSoftDeleteTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_softdelete(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        delete_workspace_api_call(user1token, workspace.get('id'))

        workspaces = Workspace.objects.filter(id=workspace.get('id'))
        self.assertEquals(workspaces.count(), 0)

        workspaces = Workspace.objects.include_deleted().filter(
            id=workspace.get('id'))
        self.assertEquals(workspaces.count(), 1)


def workspace_softdelete_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        VaultSoftDeleteTest))
    return suite
