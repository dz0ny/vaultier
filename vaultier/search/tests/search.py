from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call
from libs.version.context import version_context_manager
from .api import search_api_call
from vaultier.test.tools import format_response
from vaults.tests.api import create_vault_api_call
from workspaces.tests.api import create_workspace_api_call


class ApiSearchTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_search_vault_case_insensitive(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="this is vault",
                                      workspace=workspace.get('id')).data

        response = search_api_call(user1token, query='VaUlT')

        # should be ok
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # one vault should be returned
        self.assertEqual(
            len(response.data.get('vaults')),
            1,
            format_response(response)
        )

    def test_020_search_vault_permissions(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create user2
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='Marcel').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace1 = create_workspace_api_call(user1token,
                                               name='Workspace').data

        # create vault
        vault1 = create_vault_api_call(user1token, name="this is vault 1",
                                       workspace=workspace1.get('id')).data

        # create workspace
        workspace2 = create_workspace_api_call(user2token,
                                               name='Workspace').data

        #create vault
        vault2 = create_vault_api_call(user2token, name="this is vault 2",
                                       workspace=workspace2.get('id')).data

        response = search_api_call(user1token, query='VaUlT')
        # one vault should be returned
        self.assertEqual(
            response.data.get('vaults')[0].get('name'),
            'this is vault 1',
            format_response(response)
        )

        response = search_api_call(user2token, query='VaUlT')
        # one vault should be returned
        self.assertEqual(
            response.data.get('vaults')[0].get('name'),
            'this is vault 2',
            format_response(response)
        )

    def test_030_search_card_case_insensitive(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="this is vault",
                                      workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="this is card",
                                    vault=vault.get('id')).data

        response = search_api_call(user1token, query='ThIs')

        # should be ok
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        # one vault should be returned
        self.assertEqual(
            len(response.data.get('vaults')),
            1,
            format_response(response)
        )

        # one card should be returned
        self.assertEqual(
            len(response.data.get('cards')),
            1,
            format_response(response)
        )

    def test_040_search_card_permissions(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create user2
        email = 'marcel@rclick.cz'
        register_api_call(email=email, nickname='Marcel').data
        user2token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace1 = create_workspace_api_call(user1token,
                                               name='Workspace').data

        # create vault
        vault1 = create_vault_api_call(user1token, name="this is vault 1",
                                       workspace=workspace1.get('id')).data

        #create card
        card1 = create_card_api_call(user1token, name="this is card 1",
                                     vault=vault1.get('id')).data

        # create workspace
        workspace2 = create_workspace_api_call(user2token,
                                               name='Workspace').data

        #create vault
        vault2 = create_vault_api_call(user2token, name="this is vault 2",
                                       workspace=workspace2.get('id')).data

        #create card
        card2 = create_card_api_call(user2token, name="this is card 2",
                                     vault=vault2.get('id')).data

        response = search_api_call(user1token, query='card')
        # one vault should be returned
        self.assertEqual(
            response.data.get('cards')[0].get('name'),
            'this is card 1',
            format_response(response)
        )

        response = search_api_call(user2token, query='card')
        # one vault should be returned
        self.assertEqual(
            response.data.get('cards')[0].get('name'),
            'this is card 2',
            format_response(response)
        )


def search_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiSearchTest))
    return suite
