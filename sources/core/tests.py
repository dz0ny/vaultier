from django.test.testcases import TestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from core.test.acl import acl_suite
from core.test.auth import auth_suite
from core.test.member import member_suite
from core.test.role import role_suite
from core.test.vault import vault_suite
from core.test.vault_perms import vault_perms_suite
from core.test.workspace import workspace_suite
from core.test.workspace_perms import workspace_perms_suite


def suite():
    suite = TestSuite()

    suite.addTest(acl_suite())
    #suite.addTest(auth_suite())
    #suite.addTest(workspace_suite())
    #suite.addTest(member_suite())
    #suite.addTest(role_suite())
    #suite.addTest(workspace_perms_suite())
    #suite.addTest(vault_suite())
   # suite.addTest(vault_perms_suite())

    return suite