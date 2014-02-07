from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED
from vaultier.models.member.model import Member
from vaultier.models.role.model import Role
from vaultier.models.workspace.model import Workspace
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.tools import format_response
from vaultier.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call


class ApiWorkspaceTest(TransactionTestCase):

    #todo: create, edit

    def test_010_create_workspace(self):

        # create user
        email = 'jan.misek@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        token = auth_api_call(email=email).data.get('token')

        # create workspace
        response = create_workspace_api_call(token, name='Workspace')
        workspace_id = response.data.get('id')
        self.assertEqual(response.status_code,HTTP_201_CREATED, format_response(response))

        #assert single membership exists
        self.assertEqual(Member.objects.count(), 1)

        #assets role has been created together with workspace
        self.assertEqual(Role.objects.count(),1)

        #assert workspace deletion
        response = delete_workspace_api_call(token, workspace_id)

        #assert no workspace exists
        self.assertEqual(Member.objects.count(), 0)

        #assets no role exists
        self.assertEqual(Workspace.objects.count(),0)


def workspace_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiWorkspaceTest))
    return suite