from django.utils.unittest.suite import TestSuite
from vaultier.test.acl import acl_suite
from vaultier.test.auth import auth_suite
from vaultier.test.card import card_suite
from vaultier.test.card_perms import card_perms_suite
from vaultier.test.invitation import invitation_suite
from vaultier.test.member import member_suite
from vaultier.test.role import role_suite
from vaultier.test.search import search_suite
from vaultier.test.secret import secret_suite
from vaultier.test.secret_perms import secret_perms_suite
from vaultier.test.slug import slug_suite
from vaultier.test.vault import vault_suite
from vaultier.test.vault_perms import vault_perms_suite
from vaultier.test.version import version_suite
from vaultier.test.workspace import workspace_suite
from vaultier.test.workspace_perms import workspace_perms_suite
from vaultier.test.workspacekey import workspacekey_suite


def suite():
    suite = TestSuite()

    #suite.addTest(auth_suite())

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

    suite.addTest(version_suite())

    return suite