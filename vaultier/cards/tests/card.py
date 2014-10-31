from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_204_NO_CONTENT
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call, retrieve_card_api_call, \
    list_cards_api_call
from libs.version.context import version_context_manager
from vaultier.test.tools import format_response
from vaultier.test.tools.workspace.api import create_workspace_api_call
from vaults.tests.api import create_vault_api_call, delete_vault_api_call


class ApiCardTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_create_card(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace",
                                      workspace=workspace.get('id')).data

        #create card
        response = create_card_api_call(user1token, name="card_in_vault",
                                        vault=vault.get('id'))

        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

    @unittest.skip("should be fixed asap")
    def test_020_delete_card(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace",
                                      workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault",
                                    vault=vault.get('id')).data

        #delete vault
        response = delete_vault_api_call(user1token, card.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

    def test_030_list_cards(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace",
                                      workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault",
                                    vault=vault.get('id')).data

        #list cards
        response = list_cards_api_call(user1token, vault=vault.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_040_retrieve_card(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace",
                                      workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault",
                                    vault=vault.get('id')).data

        #retrieve card
        response = retrieve_card_api_call(user1token, card.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )


def card_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiCardTest))
    return suite
