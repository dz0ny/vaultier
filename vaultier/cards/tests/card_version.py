from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from accounts.tests.api import register_api_call, auth_api_call
from cards.tests.api import create_card_api_call, update_card_api_call, \
    delete_card_api_call
from libs.version.context import version_context_manager
from libs.version.manipulator import ACTION_CREATED, ACTION_UPDATED, \
    ACTION_SOFTDELETED, ACTION_MOVED
from vaultier.test.tools import AssertionsMixin
from vaults.tests.api import create_vault_api_call
from versions.models import Version
from workspaces.tests.api import create_workspace_api_call


class CardVersionTest(AssertionsMixin, TransactionTestCase):
    def setUp(self):
        version_context_manager.set_enabled(True)

    def create_card(self):
        # create user
        email = 'jan@rclick.cz'
        user1 = register_api_call(email=email, nickname='jan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token,
                                              name='workspace').data

        # create vault
        vault = create_vault_api_call(user1token,
                                      workspace=workspace.get('id'),
                                      name='vault'
                                      ).data

        # create card
        card = create_card_api_call(user1token,
                                    name="card_in_vault",
                                    vault=vault.get('id')
                                    ).data

        return user1, user1token, workspace, vault, card

    @unittest.skip("should be fixed asap")
    def test_card_010_create(self):
        user1, user1token, workspace, vault, card = list(self.create_card())

        # check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id')
        )

        # one version should be there
        self.assertEquals(versions.count(), 1)

        # compare version
        self.assert_model(versions[0], {
            'versioned_id': card.get('id'),
            'versioned_related_id': workspace.get('id'),
            'action_id': ACTION_CREATED
        })

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})

        # assert user has been stored with version
        self.assertEqual(versions[0].created_by.id, user1.get('id'))

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'card')
        self.assertEqual(versions[0].versioned_related_id, card.get('id'))

    @unittest.skip("should be fixed asap")
    def test_card_020_update(self):
        user1, user1token, workspace, vault, card = list(self.create_card())

        # update card
        card = update_card_api_call(user1token, card.get('id'),
                                    name='renamed_card',
                                    description='added_card_description'
                                    ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
            action_id=ACTION_UPDATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {
            'name': 'card_in_vault',
            'description': None
        })

        card = update_card_api_call(user1token, card.get('id'),
                                    name='renamed_card_again',
                                    description="changed_card_description"
                                    ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
            action_id=ACTION_UPDATED
        )

        # two versions should be there
        self.assertEquals(versions.count(), 2)

        # compare revision data
        self.assert_dict(versions[1].revert_data, {
            'name': 'renamed_card',
            'description': 'added_card_description'
        })

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'card')
        self.assertEqual(versions[0].versioned_related_id, card.get('id'))

    def test_card_030_delete(self):
        user1, user1token, workspace, vault, card = list(self.create_card())

        # check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
            action_id=ACTION_CREATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        delete_card_api_call(user1token, card.get('id'))

        #check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
            action_id=ACTION_SOFTDELETED
        )

        # two versions should be there, created and deleted
        self.assertEquals(versions.count(), 1)

        # compare revision data
        self.assert_dict(versions[0].revert_data, {'deleted_at': None})

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'vault')
        self.assertEqual(versions[0].versioned_related_id, vault.get('id'))

    def test_card_040_move(self):
        user1, user1token, workspace, vault, card = list(self.create_card())

        # create second vault
        second_vault = create_vault_api_call(
            user1token,
            workspace=workspace.get('id'),
            name='second_vault'
        ).data

        # check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
            action_id=ACTION_CREATED
        )

        # one  versions should be there
        self.assertEquals(versions.count(), 1)

        card = update_card_api_call(user1token, card.get('id'),
                                    vault=second_vault.get('id'),
                                    name='renamed_card_again',
                                    description="changed_card_description"
                                    ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
        )

        # 3 versions should be there, created, update and moved
        self.assertEquals(versions.count(), 3)

        #check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id'),
            action_id=ACTION_MOVED
        )

        # compare revision data
        self.assert_dict(versions[0].revert_data,
                         {'vault_id': vault.get('id')})

        # assert related id
        self.assertEqual(versions[0].versioned_related_type.model, 'card')
        self.assertEqual(versions[0].versioned_related_id, card.get('id'))


def card_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(CardVersionTest))
    return suite
