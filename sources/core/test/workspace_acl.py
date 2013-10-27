from django.test.testcases import TestCase, TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.member_tools import invite_member_api_call
from core.test.tools import VaultierAPIClient, format_response
from core.test.workspace_tools import create_workspace_api_call


class ApiWorkspaceAclTest(TransactionTestCase):

    def test_workspace_acl(self):

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'tomas@rclick.cz'
        register_api_call(email=email, nickname='tomas').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token, name='workspace1').data

        # create second workspace for user1
        workspace2 = create_workspace_api_call(user1token, name='workspace2').data

        # user1 tries to invite user2 to workspace1
        response = invite_member_api_call(user1token, email='jakub@rclick.cz', workspace=workspace1.get('id'))
        self.assertEqual(response.status_code, HTTP_200_OK, format_response(response))


def workspace_acl_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiWorkspaceAclTest))
    return suite