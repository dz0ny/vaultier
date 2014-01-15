from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT
from vaultier.models.member import Member
from vaultier.models.member_fields import MemberStatusField
from vaultier.models.role import Role
from vaultier.models.role_fields import RoleLevelField
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.member_tools import invite_member_api_call, accept_invitation_api_call, list_member_roles_api_call, get_workspace_key_api_call, set_workspace_key_api_call, delete_member_api_call, list_members_api_call
from vaultier.test.role_tools import create_role_api_call
from vaultier.test.tools import format_response
from vaultier.test.workspace_tools import create_workspace_api_call


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

    def test_020_acceptations_membership_merging_and_accepting(self):

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
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY) .count(),1)
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
        self.assertEqual(Member.objects.filter(status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY) .count(),2)

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

    def test_030_list_roles_for_hash(self):

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'jakub@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        user1workspace = create_workspace_api_call(user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)

        #invite user 2
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash
        create_role_api_call(user1token, user2member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)

        #invite user 3
        user3member = invite_member_api_call(user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(pk=user3member.get('id')).invitation_hash
        create_role_api_call(user1token, user3member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)


        # list roles for workspace1 without hash, should be forbidden
        response = list_member_roles_api_call(user2token, user2member.get('id'), 'testovaci-hash' )
        self.assertEquals(
            response.status_code,
            HTTP_400_BAD_REQUEST,
            format_response(response)
        )

        # list roles for workspace1 with hash, should be allowed
        response = list_member_roles_api_call(user2token, user2member.get('id'),user2invitation )
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # only one role should be visible
        self.assertEquals(
            len(response.data),
            1,
            format_response(response)
        )




    def test_041_get_workspace_key(self):
        #only member approved member of workspace can see workspace key
        #only manager can see approved member workspace key

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'jakub@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user2token = auth_api_call(email=email).data.get('token')

        # create third user
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user3token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        user1workspace = create_workspace_api_call(user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)

        #invite user 2
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(user1token, user2member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user2token, user2member.get('id'), user2invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 3
        user3member = invite_member_api_call(user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(pk=user3member.get('id')).invitation_hash
        user3role = create_role_api_call(user1token, user3member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user3token, user3member.get('id'), user3invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 3 cannot get workspace key of user2
        response = get_workspace_key_api_call(user2token, user3member.get('id'))
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user 3 cannot get workspace key of user1
        response = get_workspace_key_api_call(user2token, 1)
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user1 should be able to get workspace key of user 2
        response = get_workspace_key_api_call(user1token, user2member.get('id'))
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user1 will transfer keys to user2
        response = set_workspace_key_api_call(user1token, user2member.get('id'), 'this-is-only-mockup-key')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 2 should be able to read workspace_key of user 3
        response = get_workspace_key_api_call(user2token, user3member.get('id'))
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )



    def test_042_set_workspace_key(self):
        #transfer key
        #key cannot be empty
        #non_approved member cannot transfer key
        #transfer key cannot be done only once by regular member
        #transfer key can be done repeatedly by workspace manager

         # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'jakub@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user2token = auth_api_call(email=email).data.get('token')

        # create third user
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user3token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        user1workspace = create_workspace_api_call(user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)

        #invite user 2
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(user1token, user2member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user2token, user2member.get('id'), user2invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 3
        user3member = invite_member_api_call(user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(pk=user3member.get('id')).invitation_hash
        user3role = create_role_api_call(user1token, user3member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user3token, user3member.get('id'), user3invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 3 cannot set workspace key of user2
        response = set_workspace_key_api_call(user2token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user 3 cannot set workspace key of user1
        response = set_workspace_key_api_call(user2token, 1,'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user1 should be able to set workspace key of user 2
        response = set_workspace_key_api_call(user1token, user2member.get('id'),'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user2 should be able to set workspace key of user3
        response = set_workspace_key_api_call(user2token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 2 should not be able to rewrite workspace_key of user 3
        response = set_workspace_key_api_call(user2token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user1 should be able to rewrite workspace key of user3
        response = set_workspace_key_api_call(user1token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )


    def test_050_delete_member(self):
        #only workspace manager can delete member
        #no roles should be in db for member
        #no acl should be in db for member

         # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'jakub@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user2token = auth_api_call(email=email).data.get('token')

        # create third user
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user3token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        user1workspace = create_workspace_api_call(user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)

        #invite user 2
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(user1token, user2member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user2token, user2member.get('id'), user2invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 3
        user3member = invite_member_api_call(user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(pk=user3member.get('id')).invitation_hash
        user3role = create_role_api_call(user1token, user3member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user3token, user3member.get('id'), user3invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )


        response = delete_member_api_call(user2token, user3member.get('id') )
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        response = delete_member_api_call(user1token, user3member.get('id') )
        self.assertEquals(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

    def test_60_list_members(self):
        #only workspace manager can list members
        #manager should se members only of workspaces he is manager of

         # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create second user
        email = 'jakub@rclick.cz'
        register_api_call(email=email, nickname='jakub').data
        user2token = auth_api_call(email=email).data.get('token')

        # create third  user
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='marcel').data
        user3token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        user1workspace = create_workspace_api_call(user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)

        #invite user 2
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(user1token, user2member.get('id'), to_workspace=user1workspace.get('id'), level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(user2token, user2member.get('id'), user2invitation)

        response = list_members_api_call(user1token, user1workspace.get('id'))
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )
        self.assertEquals(
            len(response.data),
            2,
            format_response(response)
        )
        response = list_members_api_call(user3token, user1workspace.get('id'))
        self.assertEquals(
            len(response.data),
            0,
            format_response(response)
        )





def member_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiInviteTest))
    return suite