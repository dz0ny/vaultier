from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from core.test.auth import auth_suite
from core.test.member import member_suite
from core.test.workspace import workspace_suite


def suite():
    suite = TestSuite()
    suite.addTest(auth_suite())
    suite.addTest(workspace_suite())
    suite.addTest(member_suite())

    return suite