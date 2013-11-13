from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.member_tools import invite_member_api_call, accept_invitation_api_call, list_members_api_call
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

        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash

        user3member = invite_member_api_call(user1token, 'stepan@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(pk=user3member.get('id')).invitation_hash

        user4member = invite_member_api_call(user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user4invitation = Member.objects.get(pk=user4member.get('id')).invitation_hash

        # 3 invitations in db, one approved member
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_MEMBER) .count(),1)
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_INVITED) .count(),3)

        #user2 will accept all invitations, only one member should exists
        response = accept_invitation_api_call(user2token, user2member.get('id'), user2invitation)
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )
        response = accept_invitation_api_call(user2token, user3member.get('id'), user3invitation)
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        response = accept_invitation_api_call(user2token, user4member.get('id'), user4invitation)
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )


        # 1 approved member, 1 non approved member
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_MEMBER) .count(),1)
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_NON_APPROVED_MEMBER) .count(),1)


        # user2 accepted all 3 invitations, but he has no roles in any workspace, he should see no memebers
        response = list_members_api_call(user2token, workspace=user1workspace.get('id'))
        self.assertEqual(
            len(response.data),
            0
        )


        # user1 should see two members
        response = list_members_api_call(user1token, workspace=user1workspace.get('id'))
        self.assertEqual(
            len(response.data),
            2
        )

def member_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiInviteTest))
    return suite