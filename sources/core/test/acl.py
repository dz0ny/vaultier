from django.db.models.signals import post_save
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from rest_framework.status import HTTP_201_CREATED, HTTP_403_FORBIDDEN, HTTP_200_OK
from core.models.acl import Acl
from core.models.card import Card
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.models.role import Role
from core.models.role_fields import RoleLevelField
from core.models.user import User
from core.models.vault import Vault
from core.models.workspace import Workspace
from core.test.auth_tools import auth_api_call, register_api_call
from core.test.member_tools import invite_member_api_call, accept_invitation_api_call
from core.test.role_tools import create_role_api_call
from core.test.tools import format_response
from core.test.vault_tools import create_vault_api_call, delete_vault_api_call, retrieve_vault_api_call
from core.test.workspace_tools import create_workspace_api_call, delete_workspace_api_call, list_workspaces_api_call
from core.tools.changes import post_change



class AclTest(TransactionTestCase):


    def test_01_create_role(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

        # already materialized roles should be deleted
        Acl.objects.all().delete()

        v = Vault()
        v._user = u
        v.name = 'vault'
        v.workspace = w
        v.created_by = u
        v.save()

        c = Card()
        c.name = 'vault'
        c.vault = v
        c.created_by = u
        c.save()

        m = Member()
        m.user = u
        m.status = MemberStatusField.STATUS_MEMBER
        m.workspace = w
        m.created_by = u
        m.save()

        role = Role()
        role.level = RoleLevelField.LEVEL_WRITE
        role.created_by = u
        role.set_object(v)
        role.member = m
        role.save()

        # 3 acls should be in db
        self.assertEquals(Acl.objects.all().count(),3)

        # parent acls should be read
        self.assertEquals(w.acl_set.all().count(), 1)
        self.assertEquals(w.acl_set.all()[0].level,RoleLevelField.LEVEL_READ)

        # current should be write
        self.assertEquals(v.acl_set.all().count(), 1)
        self.assertEquals(v.acl_set.all()[0].level,RoleLevelField.LEVEL_WRITE)

        #childs should be write
        self.assertEquals(c.acl_set.all().count(), 1)
        self.assertEquals(c.acl_set.all()[0].level,RoleLevelField.LEVEL_WRITE)


        # current should be write
        self.assertEquals(v.acl_set.all().count(), 1)
        self.assertEquals(v.acl_set.all()[0].level,RoleLevelField.LEVEL_WRITE)

    def test_01_update_role(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

        # already materialized roles should be deleted
        Acl.objects.all().delete()

        v = Vault()
        v._user = u
        v.name = 'vault'
        v.workspace = w
        v.created_by = u
        v.save()

        c = Card()
        c.name = 'vault'
        c.vault = v
        c.created_by = u
        c.save()

        m = Member()
        m.user = u
        m.status = MemberStatusField.STATUS_MEMBER
        m.workspace = w
        m.created_by = u
        m.save()

        role = Role()
        role.level = RoleLevelField.LEVEL_READ
        role.created_by = u
        role.set_object(v)
        role.member = m
        role.save()

        role.level = RoleLevelField.LEVEL_WRITE
        role.save()

        # 3 acls should be in db
        self.assertEquals(Acl.objects.all().count(),3)

        # parent acls should be read
        self.assertEquals(w.acl_set.all().count(), 1)
        self.assertEquals(w.acl_set.all()[0].level,RoleLevelField.LEVEL_READ)

        # current should be write
        self.assertEquals(v.acl_set.all().count(), 1)
        self.assertEquals(v.acl_set.all()[0].level,RoleLevelField.LEVEL_WRITE)

        #childs should be write
        self.assertEquals(c.acl_set.all().count(), 1)
        self.assertEquals(c.acl_set.all()[0].level,RoleLevelField.LEVEL_WRITE)


        # current should be write
        self.assertEquals(v.acl_set.all().count(), 1)
        self.assertEquals(v.acl_set.all()[0].level,RoleLevelField.LEVEL_WRITE)


def acl_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(AclTest))
    return suite