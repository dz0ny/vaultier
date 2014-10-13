from .secret import secret_suite
from .secret_blob import secret_blob_suite
from .secret_blob_version import secret_blob_version_suite
from .secret_perms import secret_perms_suite
from .secret_softdelete import secret_softdelete_suite
from .secret_version import secret_version_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(secret_suite())
    s.addTest(secret_blob_suite())
    s.addTest(secret_blob_version_suite())
    s.addTest(secret_perms_suite())
    s.addTest(secret_softdelete_suite())
    s.addTest(secret_version_suite())
    return s
