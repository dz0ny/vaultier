from .invitation import invitation_suite
from .workspace import workspace_suite
from .workspace_perms import workspace_perms_suite
from .workspace_softdelete import workspace_softdelete_suite
from .workspace_version import workspace_version_suite
from .workspacekey import workspacekey_suite
from django.utils.unittest.suite import TestSuite


def suite():
    s = TestSuite()
    s.addTest(workspace_suite())
    s.addTest(workspace_perms_suite())
    s.addTest(workspace_softdelete_suite())
    s.addTest(workspace_version_suite())
    s.addTest(workspacekey_suite())
    return s
