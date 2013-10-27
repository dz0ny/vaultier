from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_201_CREATED
from core.models.acl_fields import AclLevelField
from core.models.member import Member
from core.models.role import Role
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.member_tools import invite_member_api_call, accept_invitation_api_call
from core.test.role_tools import create_role_api_call
from core.test.tools import format_response
from core.test.workspace_tools import create_workspace_api_call


class ApiRoleTest(TransactionTestCase):

    def test_permissions_to_manage_roles(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token, name='workspace1').data
        user1member = Member.objects.all()[0]

        # create second user
        email = 'stepan@rclick.cz'
        register_api_call(email=email, nickname='stepan').data
        user2token = auth_api_call(email=email).data.get('token')

        #user2 tries to add role to user1 and workspace1 - should be forbidden
        response = create_role_api_call(user2token, user1member.id, level=AclLevelField.LEVEL_READ, to_workspace=workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )




    def test_merged_member_role_is_also_moved_with_member(self):
        #@todo: impl
        pass

    def test_role_is_saved_only_once(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token, name='workspace1').data

        # user1 invites user2 to workspace1
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', workspace1.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash

        # user1 grant read role to user2
        response = create_role_api_call(user1token, user2member.get('id'), level=AclLevelField.LEVEL_WRITE, to_workspace=workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

        # user1 grant read role to user2
        response = create_role_api_call(user1token, user2member.get('id'), level=AclLevelField.LEVEL_READ, to_workspace=workspace1.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

        #check roles in db. There should be one role with read permission for user2
        roles = Role.objects.filter(member=user2member.get('id'), to_workspace=workspace1.get('id'))
        self.assertEqual(
            roles.count(),
            1,
            format_response(response)
        )

        #role should have level read as it was rewriten
        self.assertEqual(
            roles[0].level,
            AclLevelField.LEVEL_READ,
            format_response(response)
        )


    #
    #def test_workspace_roles(self):
    #
    #    # create first user
    #    email = 'jan@rclick.cz'
    #    register_api_call(email=email, nickname='jan').data
    #    user1token = auth_api_call(email=email).data.get('token')
    #
    #    # create second user
    #    email = 'tomas@rclick.cz'
    #    register_api_call(email=email, nickname='tomas').data
    #    user2token = auth_api_call(email=email).data.get('token')
    #
    #    # create workspace for user1
    #    workspace1 = create_workspace_api_call(user1token, name='workspace1').data
    #
    #    # create second workspace for user1
    #    workspace2 = create_workspace_api_call(user1token, name='workspace2').data
    #
    #    # user1 invites user2 to workspace1
    #    user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', workspace1.get('id')).data
    #    user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash
    #
    #    # user1 grant read role to user2
    #    response = create_role_api_call(user1token, user2member.get('id'), level=AclLevelField.LEVEL_READ, to_workspace=workspace1.get('id'))
    #    self.assertEqual(
    #        response.status_code,
    #        HTTP_200_OK,
    #        format_response(response)
    #    )
    #
    #    #user2 accepts invitation
    #    response = accept_invitation_api_call(user2token, id=user2member.get('id'), hash=user2invitation)
    #    self.assertEqual(
    #        response.status_code,
    #        HTTP_403_FORBIDDEN,
    #        format_response(response)
    #    )




def role_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiRoleTest))
    return suite