from itertools import ifilter
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST, \
    HTTP_201_CREATED, HTTP_200_OK
from accounts.business.fields import MemberStatusField
from accounts.models import User, LostKey, Member
from accounts.tests.api import register_api_call, auth_api_call, \
    create_lost_keys_api_call, retrieve_lost_key_api_call, \
    update_lost_key_api_rebuild_call, invite_member_api_call, \
    update_lost_key_api_disable_call
from acls.business.fields import RoleLevelField
from acls.tests.api import create_role_api_call
from libs.version.context import version_context_manager
from vaultier.test.tools import AssertionsMixin
from workspaces.models import Workspace
from workspaces.tests.api import create_workspace_api_call, \
    set_workspace_key_api_call, accept_invitation_api_call


class ApiLostKeyTest(TransactionTestCase, AssertionsMixin):
    """
    Exercise the lost_key API
    """

    def setUp(self):
        version_context_manager.set_enabled(False)

    def create_user(self, email, nickname):
        """
        Creates a new user and return the user instance with the user
        token for authenticated
        :param email: str
        :param nickname: str
        :return:user, token
        """
        register_api_call(email=email, nickname=nickname).data
        user_token = auth_api_call(email=email).data.get('token')
        user = User.objects.get(email=email)
        return user, user_token

    def test_010_should_not_create_resource_with_wrong_email(self):
        """
        Test create view with invalid email
        :return:
        """
        email = 'test010@rclick.com'
        response = create_lost_keys_api_call(email=email)
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST,
                         "Email not found ")

    def test_015_hash_should_be_unique(self):
        # create user
        user, token = self.create_user('test015@rclick.com', 'test015')
        # create lost key resource
        create_response = create_lost_keys_api_call(email=user.email)
        # retrieve lost key resource
        lost_key_1 = LostKey.objects.get(pk=create_response.data.get('id'))

        # create second lost key resource
        create_response = create_lost_keys_api_call(email=user.email)
        # retrieve second lost key resource
        lost_key_2 = LostKey.objects.get(pk=create_response.data.get('id'))

        self.assertNotEqual(lost_key_1.hash, lost_key_2.hash,
                            "Different lost keys should contain different "
                            "hash even for the same user")

    def test_020_should_create_a_new_lostkey_resource(self):
        """
        Exercise the creation of a lost key resource
        :return:
        """
        user, token = self.create_user('test020@rclick.com', 'test020')
        response = create_lost_keys_api_call(email=user.email)
        self.assertEqual(response.status_code, HTTP_201_CREATED,
                         "Should find user by email")
        self.assertEqual(response.data.get('email'), user.email,
                         "The response should contain the email")
        msg = "The Api must return the resource id"
        self.assertNotEqual(response.data.get('id'), None, msg)

    def test_030_should_not_retrieve_user_without_hash(self):
        """
        Check authentication base on hash
        :param
        :return:
        """
        user, token = self.create_user('test30@rclick.com', 'test_30')
        # create a new lostkey resource
        response = create_lost_keys_api_call(email=user.email)
        response = retrieve_lost_key_api_call(response.data.get('id'),
                                              'invalid_hash')
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         "Should find the correct user")

    def test_040_should_not_update_user_without_hash(self):
        """
        Check authentication base on hash
        :return:
        """
        user, token = self.create_user('test40@rclick.com', 'test40')
        # create a lost_key resource
        response = create_lost_keys_api_call(email=user.email)
        # update call update without hash
        response = update_lost_key_api_rebuild_call(response.data.get('id'),
                                                    '')
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         "The url needs a hash to perform validation")

    def test_050_should_update_the_user(self):
        """
        Update a user public key
        :return:
        """
        user, token = self.create_user('test050@rclick.com', 'test050')
        new_public_key = 'AnOtHer PuBlIc KeY'
        create_response = create_lost_keys_api_call(email=user.email)
        lost_key = LostKey.objects.get(pk=create_response.data.get('id'))

        response = update_lost_key_api_rebuild_call(lost_key.id, lost_key.hash,
                                                    public_key=new_public_key)
        self.assertEqual(response.status_code, HTTP_200_OK,
                         "The user has been updated")
        lost_key = LostKey.objects.get(pk=lost_key.id)
        self.assertTrue(lost_key.used,
                        "The lost key row must be marked as used")
        user = User.objects.get(email=user.email)
        self.assertEqual(user.public_key, new_public_key,
                         "The user public_key field must be updated")

    @unittest.skip("should be fixed asap")
    def test_060_should_get_the_membership_info(self):
        """
        Create two users and two workspaces invite the second user to the
        workspaces from user one and accept invitation
        Test if the Api returns correctly the memberships for user 1
        :return:
        """
        workspace_key = "Maybe blue, but is the bomb"
        # create users
        user_1, user1token = self.create_user(email='marcos@podebrady.cz',
                                              nickname='marecku')
        user_2, user2token = self.create_user(email='arnoldo@leopoldo.cz',
                                              nickname='clarin')

        # create workspaces for user1
        workspace_1 = create_workspace_api_call(
            token=user1token,
            name='name for the workspace'
        ).data
        workspace_2 = create_workspace_api_call(
            token=user1token,
            name='Very long name'
        ).data

        # approve workspace key for user1
        set_workspace_key_api_call(user1token, 1, workspace_key)

        # invite user 2 to workspace1
        user2member = invite_member_api_call(user1token, user_2.email,
                                             workspace_1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        create_role_api_call(user1token,
                             user2member.get('id'),
                             to_workspace=workspace_1.get('id'),
                             level=RoleLevelField.LEVEL_READ
                             )

        # accept invitation
        accept_invitation_api_call(user2token, user2member.get('id'),
                                   user2invitation)

        # create lost key resource
        response = create_lost_keys_api_call(email=user_1.email)
        # get the created lost key resource so that we can use the write hash
        lost_key = LostKey.objects.get(pk=response.data.get('id'))

        response = retrieve_lost_key_api_call(lost_key.id, lost_key.hash)
        memberships = response.data.get('memberships')
        # now just the user 1 is the member of both created workspaces
        self.assertTrue(len(memberships) == 2,
                        "Should return the current number of workspaces "
                        "where the user is a member")

        workspaces_fixture = [{'workspace_name': workspace_1.get('name'),
                               'is_recoverable': False},
                              {'workspace_name': workspace_2.get('name'),
                               'is_recoverable': False}]
        index = 0
        for membership in memberships:
            # Workspaces must be shared with an user that has status
            # MemberStatusField.STATUS_MEMBER to be recoverable"
            self.assert_dict(membership, workspaces_fixture[index])
            index += 1

        set_workspace_key_api_call(user1token, user2member.get('id'),
                                   workspace_key)

        response = retrieve_lost_key_api_call(lost_key.id, lost_key.hash)

        memberships = response.data.get('memberships')
        self.assertTrue(len(memberships) == 2,
                        "Should return the current number of workspaces "
                        "where the user is a member"
                        )
        list(Member.objects.filter(workspace_id=workspace_1.get('id')))

        workspaces_fixture = [{'workspace_name': workspace_1.get('name'),
                               'is_recoverable': True},
                              {'workspace_name': workspace_2.get('name'),
                               'is_recoverable': False}]
        index = 0
        for membership in memberships:
            # The API can count individually the members for each workspace
            # and differentiate by status
            self.assert_dict(membership, workspaces_fixture[index])
            index += 1

        update_lost_key_api_rebuild_call(lost_key.id,
                                         lost_key.hash,
                                         public_key='Some new key')

        user1_total_memberships_different_200 = \
            Member.objects.filter(
                user=lost_key.created_by
            ).exclude(
                status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY
            ).count()
        msg = "There should not be any membership with status different than "\
              "MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY"

        self.assertEqual(user1_total_memberships_different_200, 1, msg)

    def test_065_membership_should_not_contain_duplicate_workspaces(self):
        # create users
        user_1, user1token = self.create_user(email='test65@rclick.cz',
                                              nickname='user_1')
        self.create_user(email='test065@rclick.cz', nickname='user_2')

        # create workspaces for user1
        workspace_1 = create_workspace_api_call(token=user1token,
                                                name='workspace_1_name').data
        workspace_2 = create_workspace_api_call(token=user1token,
                                                name='workspace_2_name').data
        workspace_3 = create_workspace_api_call(token=user1token,
                                                name='workspace_3_name').data
        workspace_4 = create_workspace_api_call(token=user1token,
                                                name='workspace_4_name').data

        # create lost key resource
        response = create_lost_keys_api_call(email=user_1.email)
        # get the created lost key resource so that we can use the write hash
        lost_key = LostKey.objects.get(pk=response.data.get('id'))

        response = retrieve_lost_key_api_call(lost_key.id, lost_key.hash)
        memberships = response.data.get('memberships')

        self.assertEqual(len(memberships), 4,
                         "Membership contain the wright number of workspaces")

        msg = "The name cof the workspace can not be duplicate unless " \
              "two workspaces contain the same name"
        self.assertEqual(
            len(list(
                ifilter(
                    lambda workspace: workspace_1.get('name') == workspace.get(
                        'workspace_name'), memberships))), 1, msg)
        self.assertEqual(
            len(list(
                ifilter(
                    lambda workspace: workspace_3.get('name') == workspace.get(
                        'workspace_name'), memberships))), 1, msg)
        self.assertEqual(
            len(list(
                ifilter(
                    lambda workspace: workspace_2.get('name') == workspace.get(
                        'workspace_name'), memberships))), 1, msg)
        self.assertEqual(
            len(list(
                ifilter(
                    lambda workspace: workspace_4.get('name') == workspace.get(
                        'workspace_name'), memberships))), 1, msg)

        # now every workspace is not recoverable
        self.assertEqual(
            len(list(
                ifilter(lambda workspace: workspace.get('is_recoverable'),
                        memberships))), 0,
            "Non shared workspaces are unrecoverable")

    def test_070_cannot_use_lost_key_resource_twice(self):
        # create a lost key resource
        user, token = self.create_user('test70@email.com', 'test_70')
        create_response = create_lost_keys_api_call(user.email)
        # retrieve the lost_key resource because the hash is needed
        lost_key = LostKey.objects.get(pk=create_response.data.get('id'))

        response = update_lost_key_api_rebuild_call(
            lost_key.id, lost_key.hash, 'Some changes on the public key'
        )

        self.assertEqual(response.status_code, HTTP_200_OK,
                         "the resource was correctly updated")

        response = update_lost_key_api_rebuild_call(
            lost_key.id, lost_key.hash, 'Random changes on the public key'
        )

        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         "Once used the resource can not be used again")

    def test_080_should_disable_workspaces(self):
        workspace_key = '!-@#$%.*'
        # create users
        user_1, user1token = self.create_user(email='test80.1@rclick.cz',
                                              nickname='first_user')
        user_2, user2token = self.create_user(email='test80.2@rclick.cz',
                                              nickname='second_user')

        # create workspaces for user1
        workspace_1 = create_workspace_api_call(token=user1token,
                                                name='first workspace').data
        workspace_2 = create_workspace_api_call(
            token=user1token,
            name='second workspace').data

        # approve workspace key for user1
        set_workspace_key_api_call(user1token, 8, workspace_key)
        # invite user 2 to user 1 workspace1
        user2member = invite_member_api_call(token=user1token,
                                             email=user_2.email,
                                             workspace=workspace_1.get('id')
                                             ).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        create_role_api_call(user1token,
                             user2member.get('id'),
                             to_workspace=workspace_1.get('id'),
                             level=RoleLevelField.LEVEL_READ
                             )
        # accept invitation
        accept_invitation_api_call(user2token,
                                   user2member.get('id'),
                                   user2invitation
                                   )
        # create lost key resource
        response = create_lost_keys_api_call(email=user_1.email)
        # get the created lost key resource so that we can use the write hash
        lost_key = LostKey.objects.get(pk=response.data.get('id'))

        workspaces = Workspace.objects.filter(membership__user=user_1)
        self.assertEquals(workspaces.count(), 2)

        # disable key
        update_lost_key_api_disable_call(lost_key.id,
                                         lost_key.hash,
                                         public_key='-'
                                         )

        # get workspaces
        active_workspace = Workspace.objects.filter(membership__user=user_1)
        self.assertEquals(active_workspace.count(), 1)

        all_workspaces = Workspace.objects.include_deleted().filter(
            membership__user=user_1)
        self.assertEquals(all_workspaces.count(), 2)

        broken_status_workspaces = Workspace.objects.include_deleted().\
            filter(membership__user=user_1,
                   membership__status=MemberStatusField.STATUS_MEMBER_BROKEN
                   )
        self.assertEquals(broken_status_workspaces.count(),
                          all_workspaces.count())

    @unittest.skip("should be fixed asap")
    def test_090_should_disable_just_unrecoverable_workspaces(self):
        workspace_key = '!-@#$%.*'
        # create users
        user_1, user1token = self.create_user(email='test90.1@rclick.cz',
                                              nickname='first_user')
        user_2, user2token = self.create_user(email='test90.2@rclick.cz',
                                              nickname='second_user')

        # create workspaces for user1
        workspace_1 = create_workspace_api_call(token=user1token,
                                                name='first workspace').data
        # approve workspace key for user1
        set_workspace_key_api_call(user1token, 11, workspace_key)
        # invite user 2 to user 1 workspace1
        user2member = invite_member_api_call(token=user1token,
                                             email=user_2.email,
                                             workspace=workspace_1.get(
                                                 'id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        create_role_api_call(user1token,
                             user2member.get('id'),
                             to_workspace=workspace_1.get('id'),
                             level=RoleLevelField.LEVEL_READ
                             )
        # accept invitation
        accept_invitation_api_call(user2token,
                                   user2member.get('id'),
                                   user2invitation
                                   )
        # create lost key resource
        response = create_lost_keys_api_call(email=user_1.email)
        # get the created lost key resource so that we can use the write hash
        lost_key = LostKey.objects.get(pk=response.data.get('id'))

        workspaces = Workspace.objects.filter(membership__user=user_1)
        self.assertEquals(workspaces.count(), 2,
                          "We should be able to read every workspace")

        # disable key
        update_lost_key_api_rebuild_call(lost_key.id,
                                         lost_key.hash,
                                         public_key='Meine neu public key'
                                         )

        # get workspaces
        active_workspace = Workspace.objects.filter(
            membership__user=user_1)
        self.assertEquals(active_workspace.count(), 1,
                          "Unshared workspace was deleted")

        all_workspaces = Workspace.objects.include_deleted().filter(
            membership__user=user_1)
        self.assertEquals(all_workspaces.count(), 2,
                          "The workspace where just soft deleted")

        broken_status_workspaces = Workspace.objects \
            .include_deleted().filter(
                membership__user=user_1,
                membership__status=MemberStatusField.STATUS_MEMBER_BROKEN
            )
        self.assertTrue(
            broken_status_workspaces.count() < all_workspaces.count(),
            "Shared workspaces has status MembershipStatusField."
            "STATUS_MEMBER_WITHOUT_WORKSPACE_KEY")


def lost_keys_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiLostKeyTest))
    return suite
