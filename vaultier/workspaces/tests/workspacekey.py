from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN
from accounts.models import Member
from accounts.tests.api import register_api_call, auth_api_call, \
    invite_member_api_call
from acls.business.fields import RoleLevelField
from acls.models import Role
from acls.tests.api import create_role_api_call
from libs.version.context import version_context_manager
from vaultier.test.tools import format_response
from workspaces.tests.api import create_workspace_api_call, \
    set_workspace_key_api_call, accept_invitation_api_call, \
    list_workspace_key_api_call, get_workspace_key_api_call


class ApiWorkspaceKeyTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    @unittest.skip("should be fixed asap")
    def test_010_list_workspace_key(self):

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
        user1workspace = create_workspace_api_call(
            user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)
        # approve workspace key for ourself (user1)
        response = set_workspace_key_api_call(user1token, 1, 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 2
        user2member = invite_member_api_call(
            user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(user1token, user2member.get('id'),
                                         to_workspace=user1workspace.get('id'),
                                         level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(
            user2token, user2member.get('id'), user2invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 3
        user3member = invite_member_api_call(
            user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(
            pk=user3member.get('id')).invitation_hash
        user3role = create_role_api_call(
            user1token, user3member.get('id'),
            to_workspace=user1workspace.get('id'),
            level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(
            user3token, user3member.get('id'), user3invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user1 should see two members without workspace key
        # and one workspace key of himself
        response = list_workspace_key_api_call(user1token)
        self.assertEquals(
            len(response.data),
            3
        )

        # user2 should see no members without workspace key
        # and one workspace key of himself
        response = list_workspace_key_api_call(user2token)
        self.assertEquals(
            len(response.data),
            1
        )

    @unittest.skip("should be fixed asap")
    def test_010_get_workspace_key(self):
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
        user1workspace = create_workspace_api_call(
            user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)

        # approve workspace key for ourself (user1)
        response = set_workspace_key_api_call(user1token, 1, 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 2
        user2member = invite_member_api_call(
            user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(
            user1token, user2member.get('id'),
            to_workspace=user1workspace.get('id'),
            level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(
            user2token, user2member.get('id'), user2invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 3
        user3member = invite_member_api_call(
            user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(
            pk=user3member.get('id')).invitation_hash
        user3role = create_role_api_call(
            user1token, user3member.get('id'),
            to_workspace=user1workspace.get('id'),
            level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(
            user3token, user3member.get('id'), user3invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 3 cannot get workspace public key of member 2
        response = get_workspace_key_api_call(
            user3token, user2member.get('id'))
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
        response = get_workspace_key_api_call(
            user1token, user2member.get('id'))
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user1 will transfer keys to user2
        response = set_workspace_key_api_call(
            user1token, user2member.get('id'), 'this-is-only-mockup-key')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 2 should be able to read workspace_key of user 3
        response = get_workspace_key_api_call(
            user2token, user3member.get('id'))
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    @unittest.skip("should be fixed asap")
    def test_020_set_workspace_key(self):
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
        user1workspace = create_workspace_api_call(
            user1token, name='u1_workspace').data
        self.assertEqual(Role.objects.all().count(), 1)
        # approve workspace key for ourself (user1)
        response = set_workspace_key_api_call(user1token, 1, 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 2
        user2member = invite_member_api_call(
            user1token, 'jakub@rclick.cz', user1workspace.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        user2role = create_role_api_call(
            user1token, user2member.get('id'),
            to_workspace=user1workspace.get('id'),
            level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(
            user2token, user2member.get('id'), user2invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        #invite user 3
        user3member = invite_member_api_call(
            user1token, 'marcel@rclick.cz', user1workspace.get('id')).data
        user3invitation = Member.objects.get(
            pk=user3member.get('id')).invitation_hash
        user3role = create_role_api_call(
            user1token, user3member.get('id'),
            to_workspace=user1workspace.get('id'),
            level=RoleLevelField.LEVEL_READ)
        response = accept_invitation_api_call(
            user3token, user3member.get('id'), user3invitation)
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 3 cannot set workspace key of user2
        response = set_workspace_key_api_call(
            user3token, user2member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user 3 cannot set workspace key of user1
        response = set_workspace_key_api_call(user2token, 1, 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user1 should be able to set workspace key of user 2
        response = set_workspace_key_api_call(
            user1token, user2member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user2 should be able to set workspace key of user3
        response = set_workspace_key_api_call(
            user2token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 2 should not be able to rewrite workspace_key of user 3
        response = set_workspace_key_api_call(
            user2token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )

        # user1 should not be able to rewrite workspace key of user3
        # workspace key can be overriden only in case
        # status=withoutworkspacekey
        response = set_workspace_key_api_call(
            user1token, user3member.get('id'), 'mockup')
        self.assertEquals(
            response.status_code,
            HTTP_403_FORBIDDEN,
            format_response(response)
        )


def workspacekey_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        ApiWorkspaceKeyTest))
    return suite
