from django.utils import unittest
from django.utils.unittest.case import TestCase
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK
from core.test.auth_tools import register_api_call, auth_api_call
from core.test.member_tools import invite_member_api_call
from core.test.tools import format_response
from core.test.workspace_tools import create_workspace_api_call


class ApiInviteTest(TestCase):

    def test_invitation(self):

        # create second user
        email = 'tomas@rclick.cz'
        register_api_call(email=email, nickname='tomas').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace1 = create_workspace_api_call(user1token, name='workspace1').data

        # user1 tries to invite user2
        response = invite_member_api_call(user1token,
                                          email='jan.misek@rclick.cz',
                                          workspace=workspace1.get('id'),
                                          send=True,
                                          resend=True
        )
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response))



def invitation_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiInviteTest))
    return suite