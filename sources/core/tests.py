from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from core.test.register import ApiRegister


def suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiRegister))
    return suite