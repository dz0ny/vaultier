from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call
from libs.version.context import version_context_manager
from libs.version.manipulator import ACTION_CREATED, ACTION_UPDATED, \
    ACTION_SOFTDELETED, ACTION_MOVED
from secrets.business.fields import SecretTypeField
from secrets.tests.api import create_secret_api_call, update_secret_api_call, \
    delete_secret_api_call
from vaultier.test.tools import AssertionsMixin
from vaults.tests.api import create_vault_api_call
from versions.models import Version
from workspaces.tests.api import create_workspace_api_call


class SecretVersionTest(AssertionsMixin, TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(True)

    def create_secret(self):
        # create user
        email = 'jan@rclick.cz'
        user1 = register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        # create vault
        vault = create_vault_api_call(
            user1token, workspace=workspace.get('id'), name='vault').data

        #create card
        card = create_card_api_call(
            user1token, name="card_in_vault", vault=vault.get('id')).data

        secret = create_secret_api_call(
            user1token, type=SecretTypeField.SECRET_TYPE_PASSWORD,
            name='secret_in_card', card=card.get('id'), data="mocked_data"
        ).data

        return user1, user1token, workspace, vault, card, secret

    @unittest.skip("should be fixed asap")
    def test_secret_010_create(self):
        user1, user1token, workspace, vault, card, secret = list(
            self.create_secret())

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id')
        )

        # one version should be there
        self.assertEquals(versions.count(), 1)

        # compare version
        self.assert_model(versions[0], {
            'versioned_id': card.get('id'),
            'versioned_related_id': card.get('id'),
            'action_id': ACTION_CREATED
        })

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'card')
        self.assertEqual(versions[0].versioned_related_id, card.get('id'))

        # assert user has been stored with version
        self.assertEqual(versions[0].created_by.id, user1.get('id'))

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})

    @unittest.skip("should be fixed asap")
    def test_secret_020_update(self):
        user1, user1token, workspace, vault, card, secret = list(
            self.create_secret())

        #update secret
        secret = update_secret_api_call(
            user1token, secret.get('id'), name='renamed_secret',
            data='updated_mocked_data').data

        #get versions
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
            action_id=ACTION_UPDATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {
            'name': 'secret_in_card',
            'data': 'mocked_data'
        })

        #update secret again
        secret = update_secret_api_call(
            user1token, secret.get('id'), name='renamed_secret_again',
            data='updated_mocked_data_again').data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
            action_id=ACTION_UPDATED
        )

        # two versions should be there
        self.assertEquals(versions.count(), 2)

        # assert related id
        self.assertEqual(versions[1].versioned_related_type.model, 'card')
        self.assertEqual(versions[1].versioned_related_id, card.get('id'))

        # compare revision data
        self.assert_dict(versions[1].revert_data, {
            'name': 'renamed_secret',
            'data': 'updated_mocked_data'
        })

    def test_secret_030_delete(self):
        user1, user1token, workspace, vault, card, secret = list(
            self.create_secret())

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
            action_id=ACTION_CREATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        delete_secret_api_call(user1token, secret.get('id'))

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
            action_id=ACTION_SOFTDELETED
        )

        # one versions should be there, created and deleted
        self.assertEquals(versions.count(), 1)

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'card')
        self.assertEqual(versions[0].versioned_related_id, card.get('id'))

        # compare revision data
        self.assert_dict(versions[0].revert_data, {
            'deleted_at': None
        })

    def test_secret_040_move(self):
        user1, user1token, workspace, vault, card, secret = list(
            self.create_secret())

        # create second vault
        second_card = create_card_api_call(
            user1token, vault=vault.get('id'), name='second_card').data

        secret = update_secret_api_call(
            user1token, secret.get('id'), card=second_card.get('id'),
            name='renamed_secret').data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id')
        )

        # 3 versions should be there, created, update and moved
        self.assertEquals(versions.count(), 3)

        #get versions
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
            action_id=ACTION_MOVED
        )

        # compare revision data
        self.assert_dict(versions[0].revert_data, {'card_id': card.get('id')})

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'card')
        self.assertEqual(versions[0].versioned_related_id,
                         second_card.get('id'))

    def test_secret_050_move_with_other_versions(self):
        # Because secrets version are always related to cards
        # when secret is moved we have to ensure that card
        # was modified for all other secret versions

        user1, user1token, workspace, vault, card, secret = list(
            self.create_secret())

        # create second vault
        second_card = create_card_api_call(
            user1token, vault=vault.get('id'), name='second_card').data

        secret = update_secret_api_call(
            user1token, secret.get('id'), card=second_card.get('id'),
            name='renamed_secret',).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='secret',
            versioned_id=secret.get('id'),
        )

        # 3 versions should be there, created, update and moved
        self.assertEquals(versions.count(), 3)

        # we have to assert e.g create version card has been also changed
        for version in versions:
            self.assertEqual(
                version.versioned_related_id, second_card.get('id'))
            self.assertEqual(version.versioned_related_type.model, 'card')


def secret_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        SecretVersionTest))
    return suite
