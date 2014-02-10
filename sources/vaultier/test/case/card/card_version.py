from django.forms.models import model_to_dict
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from vaultier.models.version.manipulator import ACTION_CREATED, ACTION_UPDATED, ACTION_SOFTDELETED
from vaultier.models.version.model import Version
from vaultier.test.auth_tools import auth_api_call, register_api_call
from vaultier.test.tools.card_api_tools import create_card_api_call, delete_card_api_call, update_card_api_call
from vaultier.test.tools.vault_api_tools import create_vault_api_call
from vaultier.test.workspace_tools import create_workspace_api_call


class CardVersionTest(TransactionTestCase):
    def assert_model(self, version, required):
        version = model_to_dict(version);
        return self.assert_dict(version, required)

    def assert_dict(self, compared, required):
        for key in required.keys():
            if not compared.has_key(key):
                raise self.failureException('Missing key "{key}"'.format(key=key))
            if compared[key] != required[key]:
                raise self.failureException('key "{key}" not same'.format(key=key))


    def test_card_010_create(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token,
                                      workspace=workspace.get('id'),
                                      name='Vault'
        ).data


        #create card
        card = create_card_api_call(user1token,
                                    name="card_in_vault",
                                    vault=vault.get('id')
        ).data

        #check version
        versions = Version.objects.filter(
            versioned_type__model='card',
            versioned_id=card.get('id')
        )

        # one version should be there
        self.assertEquals(versions.count(), 1)

        # compare version
        self.assert_model(versions[0], {
            'versioned_id': card.get('id'),
            'versioned_parent_id': workspace.get('id'),
            'action_id': ACTION_CREATED
        })

        # compare revision data
        self.assert_dict(versions[0].revert_data, {})

    def test_card_020_update(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token,
                                      workspace=workspace.get('id'),
                                      name='Vault'
        ).data

        #create card
        card = create_card_api_call(user1token,
                                    name="card_in_vault",
                                    vault=vault.get('id')
        ).data

        #update card
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

    def test_card_030_delete(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(user1token, name='Workspace').data

        # create vault
        vault = create_vault_api_call(user1token,
                                      workspace=workspace.get('id'),
                                      name='Vault'
        ).data

        #create card
        card = create_card_api_call(user1token,
                                    name="card_in_vault",
                                    vault=vault.get('id')
        ).data

        #check version
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
        self.assert_dict(versions[0].revert_data, {})


def card_version_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(CardVersionTest))
    return suite