from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.models.role import Role
from core.models.role_fields import RoleLevelField
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.member_tools import invite_member_api_call, accept_invitation_api_call, list_members_api_call
from core.test.role_tools import create_role_api_call
from core.test.tools import format_response
from core.test.workspace_tools import create_workspace_api_call


class ApiInviteTest(TransactionTestCase):

    def test_010_invitations_permissions_to_workspace(self):

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'tomas@rclick.cz'
        register_api_call(email=email, nickname='tomas').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='workspace1').data

        # invite anonymous forbidden
        response = invite_member_api_call(None, email='jakub@rclick.cz', workspace=workspace.get('id'))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, format_response(response))

        # user2 tries to invite should be forbidden
        response = invite_member_api_call(user2token, email='jakub@rclick.cz', workspace=workspace.get('id'))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, format_response(response))

        # user1 tries to invite user2
        response = invite_member_api_call(user1token, email='jakub@rclick.cz', workspace=workspace.get('id'))
        self.assertEqual(response.status_code, HTTP_200_OK, format_response(response))

        # user1 tries to invite user2 again
        response = invite_member_api_call(user1token, email='jakub@rclick.cz', workspace=workspace.get('id'))
        self.assertEqual(response.status_code, HTTP_200_OK, format_response(response))

        # event when invited same user twice, only one member should exist
        self.assertEqual(Member.objects.all().count(),2)

        # user2 creates new workspace, user1 should be forbidden to invitate to workspace2
        workspace2 = create_workspace_api_call(user2token, name='workspace2').data
        response = invite_member_api_call(user1token, email='jakub@rclick.cz', workspace=workspace2.get('id'))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN, format_response(response))

    def test_020_acceptations_membership_merging(self):

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'jakub@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace and invites 3 users
        user1workspace = create_workspace_api_call(user1token, name='workspace').data
        # 1 role in db for exisitng workspace
        self.assertEqual(Role.objects.all().count(), 1)

        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash

        #create role for member 2
        create_role_api_call(
            user1token,
            user2member.get('id'),
            level=RoleLevelField.LEVEL_READ,
            to_workspace=user1workspace.get('id')
        )

        user3member = invite_member_api_call(user1token, 'stepan@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(pk=user3member.get('id')).invitation_hash

        #create role for member 3
        create_role_api_call(
            user1token,
            user3member.get('id'),
            level=RoleLevelField.LEVEL_WRITE,
            to_workspace=user1workspace.get('id')
        )

        # 3 invitations in db, one approved member
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_NON_APPROVED_MEMBER) .count(),1)
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_INVITED) .count(),2)

        # 3 roles in db, 2 for invitations, 1 for exisitng workspace
        self.assertEqual(Role.objects.all().count(), 3)

        #user2 will accept all invitations, only one member should exists
        response = accept_invitation_api_call(user2token, user2member.get('id'), user2invitation)
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # 0 approved member, 2 non approved member
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_NON_APPROVED_MEMBER) .count(),2)

        # 3 roles only should exists, for user1 and for user2 and for invitation 3
        self.assertEqual(Role.objects.all().count(), 3)

        response = accept_invitation_api_call(user2token, user3member.get('id'), user3invitation)
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # 2 roles only should exists, for user1 and for user2
        self.assertEqual(Role.objects.all().count(), 2)

        # both roles should be write
        self.assertEqual(Role.objects.filter(level=RoleLevelField.LEVEL_WRITE).count(), 2)



        # todo: move this to member_perms
        # user2 accepted all 3 invitations, but he has no roles in any workspace, he should see no memebers
        #response = list_members_api_call(user2token, workspace=user1workspace.get('id'))
        #self.assertEqual(
        #    len(response.data),
        #    0
        #)

        # todo: move this to member_perms
        # user1 should see two members
        #response = list_members_api_call(user1token, workspace=user1workspace.get('id'))
        #self.assertEqual(
        #    len(response.data),
        #    2
        #)

    #def test_030_accept_invitation_by_myself(self):
    #    # create first user
    #    email = 'tomas@rclick.cz'
    #    register_api_call(email=email, nickname='tomas').data
    #    user1token = auth_api_call(email=email).data.get('token')
    #
    #    # create workspace
    #    workspace1 = create_workspace_api_call(user1token, name='workspace1').data
    #
    #    # user1 tries to invite member
    #    user1member = invite_member_api_call(
    #        user1token,
    #        email='jan@rclick.cz',
    #        workspace=workspace1.get('id'),
    #        send=True,
    #        resend=True
    #    ).data
    #    user1member = Member.objects.get(id=user1member.get('id'))
    #
    #    # user1 grant read role to member
    #    create_role_api_call()l(
    #        user1token,
    #        user1member.get('id'),
    #        level=RoleLevelField.LEVEL_READ,
    #        to_workspace=workspace1.get('id')
    #    )
    #
    #    # user1 tries to accept invitations
    #    accept_invitation_api_call()


def member_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiInviteTest))
    return suite