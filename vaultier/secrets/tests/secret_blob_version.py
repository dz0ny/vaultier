from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_200_OK
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call
from libs.version.context import version_context_manager
from libs.version.manipulator import ACTION_UPDATED
from secrets.business.fields import SecretTypeField
from secrets.tests.api import create_secret_api_call, \
    update_secret_blob_api_call
from vaultier.test.tools import AssertionsMixin, format_response, \
    FileAccessMixin
from vaults.tests.api import create_vault_api_call
from versions.models import Version
from workspaces.tests.api import create_workspace_api_call


class SecretBlobVersionTest(TransactionTestCase, AssertionsMixin,
                            FileAccessMixin):

    def setUp(self):
        version_context_manager.set_enabled(True)

    def create_secret(self):
        # create user
        email = 'jan@rclick.cz'
        user1 = register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(user1token,
                                      name="vault_in_workspace",
                                      workspace=workspace.get('id')).data

        #create card
        card = create_card_api_call(user1token, name="card_in_vault",
                                    vault=vault.get('id')).data

        #create secret_blob
        secret = create_secret_api_call(
            user1token, name="secret_blob_in_card", card=card.get('id'),
            type=SecretTypeField.SECRET_TYPE_PASSWORD).data

        return user1, user1token, workspace, vault, card, secret

    def upload_blob(self, token, secret, filename, meta='blob_meta'):
        file = self.open_file(filename)
        response = update_secret_blob_api_call(token, secret.get('id'),
                                               blob_data=file,
                                               blob_meta=meta)
        file.close()
        return response

    @unittest.skip("should be fixed asap")
    def test_020_upload_and_versioning(self):
        user1, user1token, workspace, vault, card, secret = list(
            self.create_secret())

        response = self.upload_blob(user1token, secret, 'upload.txt',
                                    'mocked_meta')
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        self.assert_dict(
            response.data,
            {'detail': 'success'}
        )

        response = self.upload_blob(user1token, secret, 'upload.txt',
                                    'mocked_meta_updated')
        self.assertEqual(
            response.status_code,
            HTTP_200_OK,
            format_response(response)
        )

        self.assert_dict(
            response.data,
            {'detail': 'success'}
        )

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id')
        )

        # assert user has been stored with version
        self.assertEqual(versions[0].created_by.id, user1.get('id'))

         # 3 versions should be there, create, upload1 and upload2
        self.assertEquals(versions.count(), 3)

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
            manipulator_id='secret_blob_updated_manipulator',
            action_id=ACTION_UPDATED
        )

         # 1 versions should be there, upload1 and upload2
        self.assertEquals(versions.count(), 2)

        self.assertIsNotNone(versions[1].revert_data)
        self.assertIsNotNone(versions[1].revert_data.get('blob_data'))
        self.assertIsNotNone(versions[1].revert_data.get('blob_meta'))


def secret_blob_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        SecretBlobVersionTest))
    return suite
