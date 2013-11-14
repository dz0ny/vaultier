from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_403_FORBIDDEN, HTTP_200_OK, HTTP_204_NO_CONTENT
from core.models.secret_fields import SecretTypeField
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.card_tools import create_card_api_call, list_cards_api_call, retrieve_card_api_call
from core.test.secret_tools import create_secret_api_call, delete_secret_api_call, list_secrets_api_call, retrieve_secret_api_call
from core.test.tools import format_response
from core.test.vault_tools import create_vault_api_call, delete_vault_api_call, list_vaults_api_call, retrieve_vault_api_call
from core.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call
from core.tools.changes import post_change


class ApiSecretTest(TransactionTestCase):


    def test_010_create_secret(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault", vault=vault.get('id')).data

        response = create_secret_api_call(user1token, card=card.get('id'), type=SecretTypeField.SECRET_TYPE_NOTE)

        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

    def test_020_delete_card(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault", vault=vault.get('id')).data

        #create secret
        secret = create_secret_api_call(user1token,
                                        card=card.get('id'),
                                        type=SecretTypeField.SECRET_TYPE_NOTE
        ).data

        #delete secret
        response = delete_secret_api_call(user1token, secret.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )


    def test_030_list_secrets(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault", vault=vault.get('id')).data

        #create secret
        secret = create_secret_api_call(user1token,
                                        card=card.get('id'),
                                        type=SecretTypeField.SECRET_TYPE_NOTE
        ).data

        #list secrets
        response = list_secrets_api_call(user1token, card=card.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_040_retrieve_secret(self):

        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        #create vault
        vault = create_vault_api_call(user1token, name="vault_in_workspace", workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault", vault=vault.get('id')).data

        #create secret
        secret = create_secret_api_call(user1token,
                                        card=card.get('id'),
                                        type=SecretTypeField.SECRET_TYPE_NOTE
        ).data

        #retrieve secret
        response = retrieve_secret_api_call(user1token, secret.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )


def secret_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiSecretTest))
    return suite