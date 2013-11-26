from django.test.testcases import TestCase, TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from vaultier.models.member import Member
from vaultier.models.role_fields import RoleLevelField
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.member_tools import invite_member_api_call, accept_invitation_api_call
from vaultier.test.role_tools import create_role_api_call
from vaultier.test.tools import VaultierAPIClient, format_response
from vaultier.test.workspace_tools import create_workspace_api_call, list_workspaces_api_call, delete_workspace_api_call


class ApiWorkspacePermsTest(TransactionTestCase):

    #todo: workspace edit



    def test_000_workspace_anonymous_access(self):

        # user has to be authenticated
        response = create_workspace_api_call(None, name='Workspace')
        self.assertEqual(response.status_code,HTTP_403_FORBIDDEN, format_response(response))

        # user has to be authenticated
        response = list_workspaces_api_call (None)
        self.assertEqual(response.status_code,HTTP_403_FORBIDDEN, format_response(response))

    def test_010_workspace_delete_permissions(self):
        # create first user
        email = 'jan@rclick.cz'
        user1 = register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'tomas@rclick.cz'
        user2 = register_api_call(email=email, nickname='tomas').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token, name='workspace_of_user1').data

        # user1 tries to delete workspace1, should be allowed
        response = delete_workspace_api_call(user1token, workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token, name='workspace_of_user1').data

        # user2 tries to delete workspace1, should not be allowed 404 because of list he does see the workspce
        response = delete_workspace_api_call(user2token, workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        #user1 invites user and grant to user role READ
        user2member = invite_member_api_call(user1token, email=user2.get('email'), workspace=workspace1.get('id')).data
        user2hash = Member.objects.get(pk=user2member.get('id')).invitation_hash
        user2accepted = accept_invitation_api_call(user2token, id=user2member.get('id'), hash=user2hash)
        user2role = create_role_api_call(user1token, member=user2member.get('id'), to_workspace=workspace1.get('id'), level=RoleLevelField.LEVEL_READ)

        # user2 tries to delete workspace1, should not be allowed 403 because of role only read
        response = delete_workspace_api_call(user2token, workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user2 promotes role of user1 to write
        user2role = create_role_api_call(user1token, member=user2member.get('id'), to_workspace=workspace1.get('id'), level=RoleLevelField.LEVEL_WRITE)

         # user2 tries to delete workspace1, should be allowed, because he has already proper role
        response = delete_workspace_api_call(user2token, workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )


    def test_020_workspace_permission_list(self):

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