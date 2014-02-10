from django.utils.unittest.suite import TestSuite
from vaultier.test.case.card.card_version import card_version_suite
from vaultier.test.case.vault.vault_version import vault_version_suite


def suite():
    suite = TestSuite()

    #suite.addTest(auth_suite())
    #
    #suite.addTest(acl_suite())
    #
    #suite.addTest(role_suite())
    #
    #suite.addTest(member_suite())
    #suite.addTest(invitation_suite())
    #suite.addTest(workspacekey_suite())
    #
    #suite.addTest(workspace_suite())
    #suite.addTest(workspace_perms_suite())
    #
    #suite.addTest(vault_suite())
    #suite.addTest(vault_perms_suite())
    #
    #suite.addTest(card_suite())
    #suite.addTest(card_perms_suite())
    #
    #suite.addTest(secret_suite())
    #suite.addTest(secret_perms_suite())
    #
    #suite.addTest(slug_suite())
    #
    #suite.addTest(search_suite())

    suite.addTest(vault_version_suite())
    suite.addTest(card_version_suite())

    return suite