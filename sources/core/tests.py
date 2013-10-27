from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from core.test.auth import auth_suite
from core.test.member import member_suite
from core.test.role import role_suite
from core.test.workspace import workspace_suite
from core.test.workspace_acl import workspace_acl_suite


def suite():
    suite = TestSuite()
    #suite.addTest(auth_suite())
    #suite.addTest(workspace_suite())
    #suite.addTest(member_suite())
    suite.addTest(role_suite())
    #suite.addTest(workspace_acl_suite())

    return suite