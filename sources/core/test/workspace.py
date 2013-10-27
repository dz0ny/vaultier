import json
from django.core.urlresolvers import reverse
from django.test.testcases import TestCase, TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from core.models.member import Member
from core.models.role import Role
from core.models.workspace import Workspace
from core.test.auth import register_api_call, auth_api_call
from core.test.tools import VaultierAPIClient, format_response


def create_workspace_api_call(token, **kwargs):
    url = reverse('workspace-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, kwargs)
    return response


def delete_workspace_api_call(token, id):
    url = reverse('workspace-detail', args=(id,))
    client = VaultierAPIClient()
    client.token(token)
    response = client.delete(url)
    return response



class ApiWorkspaceTest(TransactionTestCase):

    def test(self):

        # user has to be authenticated
        response = create_workspace_api_call(None, name='Workspace')
        self.assertEqual(response.status_code,HTTP_403_FORBIDDEN, format_response(response))

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