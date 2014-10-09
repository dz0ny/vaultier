from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED, HTTP_200_OK,\
    HTTP_400_BAD_REQUEST
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call
from libs.version.context import version_context_manager
from secrets.business.fields import SecretTypeField
from secrets.tests.api import create_secret_api_call, \
    update_secret_blob_api_call, delete_secret_blob_api_call, \
    retrieve_secret_blob_api_call, list_secrets_blob_api_call, \
    create_secret_blob_api_call
from vaultier.test.tools import AssertionsMixin, format_response, \
    FileAccessMixin
from vaults.tests.api import create_vault_api_call
from workspaces.tests.api import create_workspace_api_call


class SecretBlobTest(TransactionTestCase, AssertionsMixin, FileAccessMixin):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def create_secret(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(
            user1token, name="vault_in_workspace",
            workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(
            user1token, name="card_in_vault", vault=vault.get('id')).data

        #create secret_blob
        secret = create_secret_api_call(
            user1token, name="secret_blob_in_card", card=card.get('id'),
            type=SecretTypeField.SECRET_TYPE_PASSWORD
        ).data

        return user1token, workspace, vault, card, secret

    def upload_blob(self, token, secret, filename):
        file = self.open_file(filename)
        response = update_secret_blob_api_call(
            token, secret.get('id'), blob_data=file, blob_meta='mocked_meta')
        file.close()
        return response

    @unittest.skip("should be fixed asap")
    def test_010_create(self):
        user1token, workspace, vault, card, secret = list(self.create_secret())

        response = create_secret_blob_api_call(user1token)

        self.assertEqual(
            response.status_code,
            HTTP_405_METHOD_NOT_ALLOWED,
            format_response(response)
        )

    def test_020_delete(self):
        user1token, workspace, vault, card, secret = list(self.create_secret())

        response = delete_secret_blob_api_call(user1token, 1)
        self.assertEqual(
            response.status_code,
            HTTP_405_METHOD_NOT_ALLOWED,
            format_response(response)
        )

    def test_020_update(self):
        user1token, workspace, vault, card, secret = list(self.create_secret())
        response = self.upload_blob(user1token, secret, 'upload.txt')
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        self.assert_dict(
            response.data,
            {'detail': 'success'}
        )

    def test_021_update_max_size_exceeded(self):

        user1token, workspace, vault, card, secret = list(self.create_secret())
        response = self.upload_blob(user1token, secret, 'upload-big.txt')

        self.assertEqual(
            response.status_code,
            HTTP_400_BAD_REQUEST,
            format_response(response)
        )

    def test_030_retrieve(self):
        user1token, workspace, vault, card, secret = list(self.create_secret())
        response = self.upload_blob(user1token, secret, 'upload.txt')
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        self.assert_dict(
            response.data,
            {'detail': 'success'}
        )

        file = self.open_file('upload.txt')
        data = file.read()
        file.close()

        response = retrieve_secret_blob_api_call(user1token, secret.get('id'))

        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        self.assertEqual(
            response.data.get('blob_data'),
            data
        )

        self.assertEqual(
            response.data.get('blob_meta'),
            'mocked_meta'
        )

    @unittest.skip("should be fixed asap")
    def test_040_list(self):
        user1token, workspace, vault, card, secret = list(self.create_secret())
        response = list_secrets_blob_api_call(user1token)
        self.assertEqual(
            response.status_code,
            HTTP_405_METHOD_NOT_ALLOWED,
            format_response(response)
        )


def secret_blob_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(SecretBlobTest))
    return suite
