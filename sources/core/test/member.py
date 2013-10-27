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
from core.test.workspace import create_workspace_api_call


def invite_member_api_call(token, email=None, workspace=None):
    url = reverse('member-list')
    client = VaultierAPIClient()
    client.token(token)
    response = client.post(url, {'email':email, 'workspace':workspace})
    return response

class ApiInviteTest(TransactionTestCase):

    def test(self):

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'tomas@rclick.cz'
        register_api_call(email=email, nickname='tomas').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        # user2 tries to invite
        response = invite_member_api_call(user2token, email='jakub@rclick.cz', workspace=workspace.get('id'))
        self.assertEqual(response.status_code, HTTP_200_OK, format_response(response))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, format_response(response))


def member_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiInviteTest))
    return suite