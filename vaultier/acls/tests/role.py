from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_200_OK, \
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from accounts.models import Member
from accounts.tests.api import register_api_call, auth_api_call, \
    invite_member_api_call
from acls.business.fields import RoleLevelField
from acls.models import Role
from acls.tests.api import create_role_api_call, list_role_api_call, \
    update_role_api_call, delete_role_api_call
from libs.version.context import version_context_manager
from vaultier.test.tools import format_response
from vaults.tests.api import create_vault_api_call
from workspaces.tests.api import create_workspace_api_call, \
    accept_invitation_api_call


class ApiRoleTest(TransactionTestCase):
    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_permissions_to_manage_roles(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data
        user1member = Member.objects.all()[0]

        # create second user
        email = 'stepan@rclick.cz'
        register_api_call(email=email, nickname='stepan').data
        user2token = auth_api_call(email=email).data.get('token')

        # user2 tries to add role to user1 and workspace1 - should be forbidden
        response = create_role_api_call(user2token, user1member.id,
                                        level=RoleLevelField.LEVEL_READ,
                                        to_workspace=workspace1.get('id'))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         format_response(response))

    def test_020_permissions_to_see_list_of_roles(self):
        # list roles as anonymous should be forbidden
        response = list_role_api_call(None)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         format_response(response))

        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data
        user1member = Member.objects.all()[0]

        # user1 list roles, should see one role
        response = list_role_api_call(user1token)
        self.assertEqual(response.status_code, HTTP_200_OK,
                         format_response(response))
        self.assertEqual(len(response.data), 1, format_response(response))

        # create another user
        email = 'stepan@rclick.cz'
        register_api_call(email=email, nickname='stepan').data
        user2token = auth_api_call(email=email).data.get('token')

        # user2 list roles, should see nothing, event there is one role in db
        response = list_role_api_call(user2token)
        self.assertEqual(response.status_code, HTTP_200_OK,
                         format_response(response))
        self.assertEqual(len(response.data), 0, format_response(response))

        # user1 invites user 2, user 2 should see 2 role
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz',
                                             workspace1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        accept_invitation_api_call(user2token, pk=user2member.get('id'),
                                   hash=user2invitation)
        create_role_api_call(user1token,
                             user2member.get('id'),
                             workspace1.get('id'),
                             level=RoleLevelField.LEVEL_WRITE)
        response = list_role_api_call(user2token)

        self.assertEqual(response.status_code, HTTP_200_OK,
                         format_response(response))
        self.assertEqual(len(response.data), 2, format_response(response))

        # user1 changes role level to only read, user2 should
        # be able to list roles
        create_role_api_call(user1token,
                             user2member.get('id'),
                             workspace1.get('id'),
                             level=RoleLevelField.LEVEL_READ)

        response = list_role_api_call(user2token)

        self.assertEqual(response.status_code, HTTP_200_OK,
                         format_response(response))
        self.assertEqual(len(response.data), 2, format_response(response))

        # create another user
        email = 'michal@rclick.cz'
        register_api_call(email=email, nickname='stepan').data
        user3token = auth_api_call(email=email).data.get('token')

        # user3 should not be able to list roles
        response = list_role_api_call(user3token)

        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )
        self.assertEqual(
            len(response.data),
            0,
            format_response(response)
        )

    def test_030_role_is_saved_only_once(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(
            user1token, name='workspace1').data

        # user1 invites user2 to workspace1
        user2member = invite_member_api_call(
            user1token, 'jakub@rclick.cz', workspace1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash

        # user1 grant read role to user2
        response = create_role_api_call(user1token, user2member.get('id'),
                                        level=RoleLevelField.LEVEL_WRITE,
                                        to_workspace=workspace1.get('id')
                                        )
        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

        # user1 grant read role to user2
        response = create_role_api_call(user1token,
                                        user2member.get('id'),
                                        level=RoleLevelField.LEVEL_READ,
                                        to_workspace=workspace1.get('id')
                                        )
        self.assertEqual(response.status_code, HTTP_201_CREATED,
                         format_response(response))

        # check roles in db. There should be one role with read
        # permission for user2
        roles = Role.objects.filter(member=user2member.get('id'),
                                    to_workspace=workspace1.get('id'))
        self.assertEqual(roles.count(), 1, format_response(response))

        # role should have level read as it was rewriten
        self.assertEqual(roles[0].level, RoleLevelField.LEVEL_READ,
                         format_response(response))

    def test_040_role_has_at_least_one_associated_object(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data

        # user1 invites user2 to workspace1
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz',
                                             workspace1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash

        # user1 grant read role to user2
        response = create_role_api_call(user1token,
                                        user2member.get('id'),
                                        level=RoleLevelField.LEVEL_WRITE)
        self.assertEqual(response.status_code,
                         HTTP_400_BAD_REQUEST,
                         format_response(response))

    def test_050_create_role(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create another user
        email = 'stepan@rclick.cz'
        register_api_call(email=email, nickname='stepan').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data

        # create vault for user1
        vault1 = create_vault_api_call(user1token,
                                       name='vault1',
                                       workspace=workspace1.get('id')).data

        # user1 invites user 2
        user2member = invite_member_api_call(user1token,
                                             'jakub@rclick.cz',
                                             workspace1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        accept_invitation_api_call(user2token, pk=user2member.get('id'),
                                   hash=user2invitation)

        # user 1 creates role for user 2
        response = create_role_api_call(user1token, user2member.get('id'),
                                        to_vault=vault1.get('id'),
                                        level=RoleLevelField.LEVEL_READ)
        self.assertEqual(response.status_code, HTTP_201_CREATED,
                         format_response(response))

        # user 2 tries to create role, should be forbidden
        response = create_role_api_call(user2token,
                                        user2member.get('id'),
                                        to_vault=vault1.get('id'),
                                        level=RoleLevelField.LEVEL_READ)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         format_response(response))

    def test_050_edit_and_delete_role(self):
        # create first user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create another user
        email = 'stepan@rclick.cz'
        register_api_call(email=email, nickname='stepan').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace for user1
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data

        # create vault for user1
        vault1 = create_vault_api_call(user1token, name='vault1',
                                       workspace=workspace1.get('id')).data

        # user1 invites user 2
        user2member = invite_member_api_call(user1token, 'jakub@rclick.cz',
                                             workspace1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        accept_invitation_api_call(user2token, pk=user2member.get('id'),
                                   hash=user2invitation)

        # user 1 creates role for user 2
        role = create_role_api_call(user1token, user2member.get('id'),
                                    to_vault=vault1.get('id'),
                                    level=RoleLevelField.LEVEL_READ
                                    ).data

        # user 2 tries to update role, should be forbidden
        response = update_role_api_call(user2token, role.get('id'),
                                        RoleLevelField.LEVEL_WRITE)
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         format_response(response))

        #user 2  delete role, should be forbidden
        response = delete_role_api_call(user2token, role.get('id'))
        self.assertEqual(response.status_code, HTTP_403_FORBIDDEN,
                         format_response(response))

        #user 1 update role to write,
        response = update_role_api_call(user1token, role.get('id'),
                                        RoleLevelField.LEVEL_WRITE)
        self.assertEqual(response.status_code, HTTP_200_OK,
                         format_response(response))

        #user 2 tries to update role, should be allowed
        response = update_role_api_call(user2token, role.get('id'),
                                        RoleLevelField.LEVEL_WRITE)
        self.assertEqual(response.status_code, HTTP_200_OK,
                         format_response(response))


def role_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiRoleTest))
    return suite
