from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from core.models.acl import Acl
from core.models.card import Card
from core.models.member import Member
from core.models.member_fields import MemberStatusField
from core.models.role import Role
from core.models.role_fields import RoleLevelField
from core.models.user import User
from core.models.vault import Vault
from core.models.workspace import Workspace




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

    def test_02_invited_member(self):
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

        m = Member()
        m.workspace = w
        m.created_by = u
        m.save()

        role = Role()
        role.level = RoleLevelField.LEVEL_WRITE
        role.created_by = u
        role.set_object(w)
        role.member = m
        role.save()

        # 0 acls should be in db, because no materialization should happen on invited member
        self.assertEquals(Acl.objects.all().count(),0)

    def test_03_invited_member_become_regular(self):
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

        m = Member()
        m.workspace = w
        m.created_by = u
        m.save()

        role = Role()
        role.level = RoleLevelField.LEVEL_WRITE
        role.created_by = u
        role.set_object(w)
        role.member = m
        role.save()

        m.user = u
        m.save()

        # 1 acls should be in db, because materialization should happen on regular member
        self.assertEquals(Acl.objects.all().count(),1)

    def test_04_members_are_joined(self):
        u1 = User()
        u1.email = 'u1'
        u1.save()

        u2 = User()
        u2.email = 'u2'
        u2.save()

        w = Workspace()
        w._user = u1
        w.name = 'workspace'
        w.created_by = u1
        w.save()

        # already materialized roles should be deleted
        Acl.objects.all().delete()

        m1 = Member()
        m1.workspace = w
        m1.created_by = u1
        m1.user = u1
        m1.save()

        m2 = Member()
        m2.workspace = w
        m2.created_by = u2
        m2.user = u2
        m2.save()

        role = Role()
        role.level = RoleLevelField.LEVEL_WRITE
        role.created_by = u1
        role.set_object(w)
        role.member = m1
        role.save()

        Member.objects.join_member(m1, m2)

        # 1 acls should be in db, because materialization should happen on regular member
        self.assertEquals(Acl.objects.all().count(),1)

        # acls should be related to m2
        self.assertEquals(Acl.objects.all()[0].user, m2.user )


    def test_05_update_role(self):
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

    def test_06_create_object(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

        # There should be one materialized acl in database
        self.assertEquals(w.acl_set.all().count(), 1)

        workspace_acl = w.acl_set.all()[0]
        self.assertEquals(workspace_acl.user, u)
        self.assertEquals(workspace_acl.level, RoleLevelField.LEVEL_WRITE)

        v = Vault()
        v._user = u
        v.name = 'vault'
        v.workspace = w
        v.created_by = u
        v.save()

        # there should be one another
        self.assertEquals(Acl.objects.exclude(id=workspace_acl.id).count(), 1);

        acl = Acl.objects.exclude(id=workspace_acl.id)[0]
        self.assertEquals(acl.level, RoleLevelField.LEVEL_WRITE)


def acl_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(AclTest))
    return suite