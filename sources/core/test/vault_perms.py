from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_403_FORBIDDEN
from core.models.member import Member
from core.models.role import Role
from core.models.workspace import Workspace
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.tools import format_response
from core.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call


class ApiVaultPermsTest(TransactionTestCase):

    def test_create_vault(self):
        pass

def vault_perms_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ApiVaultPermsTest))
    return suite