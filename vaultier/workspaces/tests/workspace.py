from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, \
    HTTP_200_OK
from accounts.models import Member
from accounts.tests.api import register_api_call, auth_api_call
from acls.models import Role
from libs.version.context import version_context_manager
from vaultier.test.tools import format_response
from workspaces.models import Workspace
from workspaces.tests.api import create_workspace_api_call, \
    delete_workspace_api_call, list_workspaces_api_call, \
    retrieve_workspace_api_call, update_workspace_api_call


class ApiWorkspaceTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def create_workspace_and_user(self):

        # create user
        email = 'jan.misek@rclick.cz'
        user = register_api_call(email=email, nickname='Misan').data
        token = auth_api_call(email=email).data.get('token')

        # create workspace
        response = create_workspace_api_call(token, name='Workspace')

        # assert and assign
        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )
        workspace = response.data

        return user, token, workspace

    def test_010_create_workspace(self):
        user, token, workspace = list(self.create_workspace_and_user())

        #assert single membership exists
        self.assertEqual(Member.objects.count(), 1)

        #assets role has been created together with workspace
        self.assertEqual(Role.objects.count(), 1)

    def test_020_delete_workspace(self):
        user, token, workspace = list(self.create_workspace_and_user())

        #assert workspace deletion
        response = delete_workspace_api_call(token, workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

        #assert no workspace exists
        self.assertEqual(Workspace.objects.count(), 0)

    def test_030_list_and_retrieve_workspace(self):
        user, token, workspace = list(self.create_workspace_and_user())

        #assert listing
        response = list_workspaces_api_call(token)
        self.assertEqual(
            len(response.data),
            1
        )

        #assert listing
        response = retrieve_workspace_api_call(token, workspace.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_040_update_workspace(self):
        user, token, workspace = list(self.create_workspace_and_user())

        update_workspace_api_call(token, workspace.get('id'), name='updated')

        #assert updated
        response = retrieve_workspace_api_call(token, workspace.get('id'))
        self.assertEqual(
            response.data.get('name'),
            'updated',
        )


def workspace_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        ApiWorkspaceTest))
    return suite
