from .vault import vault_suite
from .vault_perms import vault_perms_suite
from .vault_softdelete import vault_softdelete_suite
from .vault_version import vault_version_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(vault_suite())
    s.addTest(vault_perms_suite())
    s.addTest(vault_softdelete_suite())
    s.addTest(vault_version_suite())
    return s
