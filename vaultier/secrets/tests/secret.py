from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_204_NO_CONTENT
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call
from libs.version.context import version_context_manager
from secrets.business.fields import SecretTypeField
from secrets.tests.api import create_secret_api_call, delete_secret_api_call, \
    list_secrets_api_call, retrieve_secret_api_call, update_secret_api_call
from vaultier.test.tools import format_response
from vaults.tests.api import create_vault_api_call
from workspaces.tests.api import create_workspace_api_call


class ApiSecretTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def create_secret(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='workspace').data

        # create vault
        vault = create_vault_api_call(user1token,
                                      workspace=workspace.get('id'),
                                      name='vault').data

        # create card
        card = create_card_api_call(user1token,
                                    name="card_in_vault",
                                    vault=vault.get('id')).data

        response = create_secret_api_call(
            user1token, type=SecretTypeField.SECRET_TYPE_PASSWORD,
            name='secret_in_card', card=card.get('id'), data="mocked_data")

        secret = response.data

        return user1token, workspace, vault, card, secret, response

    def test_010_create_secret(self):
        user1token, workspace, vault, card, secret, response = list(
            self.create_secret())

        self.assertEqual(
            response.status_code,
            HTTP_201_CREATED,
            format_response(response)
        )

    def test_020_delete_secret(self):
        user1token, workspace, vault, card, secret, response = list(
            self.create_secret())

        # delete secret
        response = delete_secret_api_call(user1token, secret.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_204_NO_CONTENT,
            format_response(response)
        )

    def test_030_list_secrets(self):
        user1token, workspace, vault, card, secret, response = list(
            self.create_secret())

        # list secrets
        response = list_secrets_api_call(user1token, card=card.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_040_retrieve_secret(self):
        user1token, workspace, vault, card, secret, response = list(
            self.create_secret())

        # retrieve secret
        response = retrieve_secret_api_call(user1token, secret.get('id'))
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

    def test_050_secret_type_cannot_be_updated(self):
        user1token, workspace, vault, card, secret, response = list(
            self.create_secret())

        # retrieve secret
        secret = update_secret_api_call(
            user1token, secret.get('id'),
            type=SecretTypeField.SECRET_TYPE_NOTE).data

        self.assertEqual(
            secret.get('type'),
            SecretTypeField.SECRET_TYPE_PASSWORD,
        )


def secret_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiSecretTest))
    return suite
