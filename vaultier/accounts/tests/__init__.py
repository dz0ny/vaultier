from user import test_suite
from .lostkey import lost_keys_suite
from .member import member_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(test_suite())
    s.addTest(lost_keys_suite())
    s.addTest(member_suite())
    return s
