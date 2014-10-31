from .card import card_suite
from .card_perms import card_perms_suite
from .card_softdelete import card_softdelete_suite
from .card_version import card_version_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(card_suite())
    s.addTest(card_perms_suite())
    s.addTest(card_softdelete_suite())
    s.addTest(card_version_suite())
    return s
