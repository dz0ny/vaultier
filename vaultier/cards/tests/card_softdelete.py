from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from accounts.tests.api import register_api_call, auth_api_call
from cards.models import Card
from cards.tests.api import create_card_api_call, delete_card_api_call
from libs.version.context import version_context_manager
from vaults.tests.api import create_vault_api_call, delete_vault_api_call
from workspaces.tests.api import create_workspace_api_call, \
    delete_workspace_api_call


class CardSoftDeleteTest(TransactionTestCase):

    def setUp(self):
        version_context_manager.set_enabled(False)

    def create_card(self):
        # create user
        email = 'jan@rclick.cz'
        register_api_call(email=email, nickname='Misan').data
        user1token = auth_api_call(email=email).data.get('token')

        # create workspace
        workspace = create_workspace_api_call(
            user1token, name='workspace').data

        #create vault
        vault = create_vault_api_call(user1token,
                                      name="vault_in_workspace",
                                      workspace=workspace.get('id')
                                      ).data

        #create card
        card = create_card_api_call(user1token,
                                    name="card_in_vault",
                                    vault=vault.get('id')
                                    ).data

        return user1token, workspace, vault, card

    def test_010_softdelete(self):

        user1token, workspace, vault, card = list(self.create_card())

        delete_card_api_call(user1token, card.get('id'))

        cards = Card.objects.filter(id=card.get('id'))
        self.assertEquals(cards.count(), 0)

        cards = Card.objects.include_deleted().filter(id=card.get('id'))
        self.assertEquals(cards.count(), 1)

    def test_020_softdelete_vault(self):
        # create user
        user1token, workspace, vault, card = list(self.create_card())

        delete_vault_api_call(user1token, vault.get('id'))

        cards = Card.objects.filter(id=card.get('id'))
        self.assertEquals(cards.count(), 0)

        cards = Card.objects.include_deleted().filter(id=card.get('id'))
        self.assertEquals(cards.count(), 1)

    @unittest.skip("should be fixed asap")
    def test_030_softdelete_workspace(self):

        user1token, workspace, vault, card = list(self.create_card())

        delete_workspace_api_call(user1token, vault.get('id'))

        cards = Card.objects.filter(id=card.get('id'))
        self.assertEquals(cards.count(), 0)

        cards = Card.objects.include_deleted().filter(id=card.get('id'))
        self.assertEquals(cards.count(), 1)


def card_softdelete_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(
        CardSoftDeleteTest))
    return suite
