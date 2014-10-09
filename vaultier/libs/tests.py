from django.utils.unittest.suite import TestSuite
from libs.changes.tests import changes_suite


def suite():
    suite = TestSuite()

    suite.addTest(changes_suite())

    return suite
