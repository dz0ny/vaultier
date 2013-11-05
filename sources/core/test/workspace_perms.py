from django.test.testcases import TestCase, TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.member_tools import invite_member_api_call
from core.test.tools import VaultierAPIClient, format_response
from core.test.workspace_tools import create_workspace_api_call, list_workspaces_api_call


class ApiWorkspacePermsTest(TransactionTestCase):

    def test_workspace_anonymous_access(self):

        # user has to be authenticated
        response = create_workspace_api_call(None, name='Workspace')
        self.assertEqual(response.status_code,HTTP_403_FORBIDDEN, format_response(response))

        # user has to be authenticated
        response = list_workspaces_api_call (None)
        self.assertEqual(response.status_code,HTTP_403_FORBIDDEN, format_response(response))


    def test_workspace_permission_list(self):

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'tomas@rclick.cz'
        register_api_call(email=email, nickname='tomas').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token, name='workspace_of_user1').data

        # create second workspace for user1
        workspace2 = create_workspace_api_call(user2token, name='workspace_of_user2').data

        # user1 should see only his workspace
        response = list_workspaces_api_call(user1token)
        self.assertEqual(
            len(response.data),
            1,
            format_response(response)
        )
        self.assertEqual(
            response.data[0].get('name'),
            'workspace_of_user1',
            format_response(response)
        )

        # user2 should see only his workspace
        response = list_workspaces_api_call(user2token)
        self.assertEqual(
            len(response.data),
            1,
            format_response(response)
        )
        self.assertEqual(
            response.data[0].get('name'),
            'workspace_of_user2',
            format_response(response)
        )



def workspace_perms_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiWorkspacePermsTest))
    return suite