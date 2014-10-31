from slug import slug_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(slug_suite())
    return s
