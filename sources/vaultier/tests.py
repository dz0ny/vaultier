from django.utils.unittest.suite import TestSuite
from vaultier.test.case.acl.acl import acl_suite
from vaultier.test.case.auth.auth import auth_suite
from vaultier.test.case.card.card import card_suite
from vaultier.test.case.card.card_perms import card_perms_suite
from vaultier.test.case.card.card_softdelete import card_softdelete_suite
from vaultier.test.case.card.card_version import card_version_suite
from vaultier.test.case.secret.secret_softdelete import secret_softdelete_suite
from vaultier.test.case.secret.secret_version import secret_version_suite
from vaultier.test.case.secret_blob.secret_blob import secret_blob_suite
from vaultier.test.case.secret_blob.secret_blob_version import secret_blob_version_suite
from vaultier.test.case.vault.vault import vault_suite
from vaultier.test.case.vault.vault_perms import vault_perms_suite
from vaultier.test.case.vault.vault_softdelete import vault_softdelete_suite
from vaultier.test.case.vault.vault_version import vault_version_suite
from vaultier.test.case.workspace.workspace import workspace_suite
from vaultier.test.case.workspace.workspace_perms import workspace_perms_suite
from vaultier.test.case.workspace.workspace_softdelete import workspace_softdelete_suite
from vaultier.test.case.invitation.invitation import invitation_suite
from vaultier.test.case.member.member import member_suite
from vaultier.test.case.role.role import role_suite
from vaultier.test.case.search.search import search_suite
from vaultier.test.case.secret.secret import secret_suite
from vaultier.test.case.secret.secret_perms import secret_perms_suite
from vaultier.test.case.slug.slug import slug_suite
from vaultier.test.case.workspace.workspace_version import workspace_version_suite
from vaultier.test.case.workspacekey.workspacekey import workspacekey_suite
from vaultier.test.case.lostkey.lostkey import lost_keys_suite

def suite():
    suite = TestSuite()

    # authentication
    suite.addTest(auth_suite())

    # acl
    suite.addTest(acl_suite())

    # # roles
    suite.addTest(role_suite())

    # membership
    suite.addTest(member_suite())
    suite.addTest(invitation_suite())
    suite.addTest(workspacekey_suite())

    # workspace
    suite.addTest(workspace_suite())
    suite.addTest(workspace_perms_suite())

    # vault
    suite.addTest(vault_suite())
    suite.addTest(vault_perms_suite())

    # card
    suite.addTest(card_suite())
    suite.addTest(card_perms_suite())

    # secret
    suite.addTest(secret_suite())
    suite.addTest(secret_perms_suite())
    suite.addTest(secret_blob_suite())

    # slug tests
    suite.addTest(slug_suite())

    # search tests
    suite.addTest(search_suite())

    # versioning
    suite.addTest(workspace_version_suite())
    suite.addTest(vault_version_suite())
    suite.addTest(card_version_suite())
    suite.addTest(secret_version_suite())
    suite.addTest(secret_blob_version_suite())

    # soft delete
    suite.addTest(vault_softdelete_suite())
    suite.addTest(card_softdelete_suite())
    suite.addTest(workspace_softdelete_suite())
    suite.addTest(secret_softdelete_suite())

    # security/lost-keys
    suite.addTest(lost_keys_suite())

    return suite