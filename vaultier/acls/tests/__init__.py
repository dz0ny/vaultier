from .acl import acl_suite
from .role import role_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(role_suite())
    s.addTest(acl_suite())
    return s
