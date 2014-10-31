from datetime import timedelta
from django.conf import settings
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK
from accounts.business.fields import MemberStatusField
from accounts.models import Member
from accounts.tests.api import register_api_call, auth_api_call, \
    invite_member_api_call
from acls.business.fields import RoleLevelField
from libs.version.context import version_context_manager
from vaultier.test.tools import format_response, AssertionsMixin
from vaultier.test.tools.role.api import create_role_api_call
from vaultier.test.tools.workspace.api import create_workspace_api_call, \
    retrieve_workspace_api_call
from vaultier.test.tools.workspacekey.api import set_workspace_key_api_call
from django.utils import timezone
from workspaces.tests.api import accept_invitation_api_call


class ApiInviteTest(TransactionTestCase, AssertionsMixin):
    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_000_invitation(self):
        # create first user
        email = 'tomas@rclick.cz'
        register_api_call(email=email, nickname='tomas').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data

        # user1 tries to invite user2
        response = invite_member_api_call(user1token,
                                          email='jan.misek@rclick.cz',
                                          workspace=workspace1.get('id'),
                                          send=True,
                                          resend=True)
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response))

    def test_010_invitation_should_be_case_insensitive(self):
        # create first user
        user1email = 'tomas@rclick.cz'
        register_api_call(email=user1email, nickname='tomas').data
        user1token = auth_api_call(email=user1email).data.get('token')

        # create second user
        user2email = 'upper_case_user@rclick.cz'
        register_api_call(email=user2email, nickname='UPPER').data
        user2 = auth_api_call(email=user2email).data
        user2token = user2.get('token')
        user2.get('user')

        # create workspace
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data
        set_workspace_key_api_call(user1token, 1, '__KEY__')

        # user1 tries to invite user2 using upper case email
        user2member = invite_member_api_call(user1token,
                                             'UPPER_CASE_USER@rclick.cz',
                                             workspace1.get('id')).data
        user2invitation = Member.objects.get(
            pk=user2member.get('id')).invitation_hash
        create_role_api_call(user1token,
                             user2member.get('id'),
                             to_workspace=workspace1.get('id'),
                             level=RoleLevelField.LEVEL_READ
                             )
        response = accept_invitation_api_call(user2token,
                                              user2member.get('id'),
                                              user2invitation)

        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response))

        # user 2 can access to the workspace but still
        # it has not set the public key
        response = retrieve_workspace_api_call(user2token,
                                               workspace1.get('id'))
        # print response
        retrieve_workspace_fixture = {
            'id': workspace1.get('id'),
            'perms': {'read': True}
        }
        self.assert_dict(response.data, retrieve_workspace_fixture)
        self.assert_dict(
            response.data.get('membership'),
            {'status': MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY,
             'id': user2member.get('id')}
        )

        response = set_workspace_key_api_call(user1token,
                                              user2member.get('id'), '__KEY__')
        self.assertEquals(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # user 2 can access to the workspace but still it has not set
        # the public key
        response = retrieve_workspace_api_call(user2token,
                                               workspace1.get('id'))
        # print response
        retrieve_workspace_fixture = {
            'id': workspace1.get('id'),
            'perms': {'read': True}
        }
        self.assert_dict(response.data, retrieve_workspace_fixture)

        # The user2 has can access its invitation and fulfill every step of
        # the invitation process So the workspace was right assigned
        # to the user no matter the case of the email
        self.assert_dict(response.data.get('membership'),
                         {'status': MemberStatusField.STATUS_MEMBER,
                          'id': user2member.get('id')})

    def test_020_old_invitation_cleaned(self):
        # create first user
        user1email = 'ctirad@rclick.cz'
        register_api_call(email=user1email, nickname='ctirad')
        user1token = auth_api_call(email=user1email).data.get('token')

        # create workspace
        workspace1 = create_workspace_api_call(user1token,
                                               name='workspace1').data
        response = set_workspace_key_api_call(user1token, 1, '__KEY__')

        # user1 tries to invite user2 using upper case email
        user2member = invite_member_api_call(user1token, 'user2@rclick.cz',
                                             workspace1.get('id')).data

        member_model = Member.objects.get(pk=user2member.get('id'))
        """:type : Member """
        invitation_lifetime = settings.VAULTIER.get('invitation_lifetime')

        # change date of invitation
        member_model.created_at = timezone.now() - timedelta(
            days=2 * invitation_lifetime)
        member_model.save()

        # invite second user
        user3member = invite_member_api_call(user1token, 'user3@rclick.cz',
                                             workspace1.get('id')).data

        Member.objects.clean_old_invitations()
        # first invitation too old, it should be deleted
        self.assertEqual(
            Member.objects.filter(pk=user2member.get('id')).count(), 0)
        # second invitation should stay
        self.assertEqual(
            Member.objects.filter(pk=user3member.get('id')).count(), 1)


def invitation_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiInviteTest))
    return suite
