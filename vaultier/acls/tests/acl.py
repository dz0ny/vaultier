from unittest import TestSuite
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from accounts.business.fields import MemberStatusField
from accounts.models import Member, User
from acls.business.fields import RoleLevelField, AclLevelField
from acls.models import Acl, Role
from cards.models import Card
from libs.version.context import version_context_manager
from vaults.models import Vault
from workspaces.models import Workspace


class AclTest(TransactionTestCase):

    def assertAcl(self, level=None, count=None, role=None, workspace=None,
                  vault=None, card=None):
        o = None
        if workspace:
            o = workspace
            if type(o) != Workspace:
                o = Workspace.objects.get(id=workspace.pk)
        if vault:
            o = vault
            if type(o) != Vault:
                o = Vault.objects.get(id=vault.pk)
        if card:
            o = card
            if type(o) != Card:
                o = Card.objects.get(id=card.pk)

        if not o:
            raise RuntimeError('Unknown test type')

        aclset = o.acl_set.all()

        if role:
            aclset = aclset.filter(role=role)

        if level:
            aclset = aclset.filter(level=level)

        if count is None:
            self.assertGreaterEqual(aclset.count(), 1)
        else:
            self.assertEquals(aclset.count(), count)

    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_create_role(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

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

        # already materialized roles should be deleted to test only
        # create role
        Acl.objects.all().delete()
        Role.objects.all().delete()

        role = Role()
        role.level = RoleLevelField.LEVEL_WRITE
        role.created_by = u
        role.set_object(v)
        role.member = m
        role.save()

        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, workspace=w)

        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, vault=v)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, vault=v)

        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, card=c)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, card=c)

    def test_020_invited_member(self):
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
        Role.objects.all().delete()

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

        # 0 acls should be in db, because no materialization should happen
        # on invited member
        self.assertEquals(Acl.objects.all().count(), 0)

    def test_030_invited_member_become_regular(self):
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
        Role.objects.all().delete()

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

        # 1 acls should be in db, because materialization should happen on
        # regular member
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, role=role, count=1,
                       workspace=w)
        self.assertAcl(level=AclLevelField.LEVEL_READ, role=role, count=1,
                       workspace=w)

    def test_040_members_are_joined(self):
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
        Role.objects.all().delete()

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
        role.level = RoleLevelField.LEVEL_READ
        role.created_by = u1
        role.set_object(w)
        role.member = m1
        role.save()

        Member.objects.join_member(m1, m2)

        # 1 acls should be in db, because materialization should happen on
        # regular member
        self.assertEquals(Acl.objects.all().count(), 1)

        # acls should be related to m2
        self.assertEquals(Acl.objects.all()[0].user, m2.user)

    def test_050_update_role(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

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

        # already materialized roles should be deleted
        Acl.objects.all().delete()
        Role.objects.all().delete()

        role = Role()
        role.level = RoleLevelField.LEVEL_READ
        role.created_by = u
        role.set_object(v)
        role.member = m
        role.save()

        # parent acls should be read
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, workspace=w)

        role.level = RoleLevelField.LEVEL_WRITE
        role.save()

        # parent acls should be write
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, workspace=w)

        # current should be write
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, vault=v)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, vault=v)

        # childs should be write
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, card=c)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, card=c)

    @unittest.skip("should be fixed asap")
    def test_060_create_object(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

        for a in Acl.objects.all():
            print a
        # current should be write
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, workspace=w)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, workspace=w)

        v = Vault()
        v._user = u
        v.name = 'vault'
        v.workspace = w
        v.created_by = u
        v.save()

        # current should be write
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, vault=v)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, vault=v)

    @unittest.skip("should be fixed asap")
    def test_070_delete_object_or_role(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

        v = Vault()
        v._user = u
        v.name = 'vault'
        v.workspace = w
        v.created_by = u
        v.save()

        # current should be write
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, vault=v)
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, vault=v)

        v.delete()

        # there should be one acls
        self.assertEquals(Acl.objects.count(), 2)

        # there should be one role
        self.assertEquals(Role.objects.count(), 1)

        Role.objects.all().delete()

        # there should be no acls
        self.assertEquals(Acl.objects.count(), 0)

    def test_080_create_role(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

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

        # already materialized roles should be deleted
        Acl.objects.all().delete()
        Role.objects.all().delete()

        role = Role()
        role.level = RoleLevelField.LEVEL_CREATE
        role.created_by = u
        role.set_object(v)
        role.member = m
        role.save()

        # workspace read
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, workspace=w)
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=0, workspace=w)

        # vault read and create
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, vault=v)
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=0, vault=v)
        self.assertAcl(level=AclLevelField.LEVEL_CREATE, count=1, vault=v)

        # no permissions to card
        self.assertEquals(Role.objects.count(), 1)
        self.assertAcl(count=0, card=c)

        c = Card()
        c.name = 'Another card'
        c.vault = v
        c.created_by = u
        c.save()

        # manage role created to child, read and write on card
        self.assertEquals(Role.objects.count(), 2)
        self.assertAcl(level=AclLevelField.LEVEL_WRITE, count=1, card=c)
        self.assertAcl(level=AclLevelField.LEVEL_CREATE, count=0, card=c)

        a = list(c.acl_set.all())
        self.assertAcl(level=AclLevelField.LEVEL_READ, count=1, card=c)

    def test_080_create_role_multiple_inheritance(self):
        u = User()
        u.email = 'misan'
        u.save()

        w = Workspace()
        w._user = u
        w.name = 'workspace'
        w.created_by = u
        w.save()

        v = Vault()
        v._user = u
        v.name = 'vault'
        v.workspace = w
        v.created_by = u
        v.save()

        m = Member()
        m.user = u
        m.status = MemberStatusField.STATUS_MEMBER
        m.workspace = w
        m.created_by = u
        m.save()

        # already materialized roles should be deleted
        Acl.objects.all().delete()
        Role.objects.all().delete()

        role = Role()
        role.level = RoleLevelField.LEVEL_CREATE
        role.created_by = u
        role.set_object(w)
        role.member = m
        role.save()

        c = Card()
        c.name = 'vault'
        c.vault = v
        c.created_by = u
        c.save()

        # write permission to card because created by user with permission
        # create on workspace
        self.assertEquals(c.role_set.count(), 1)
        self.assertEquals(c.role_set.all()[0].level,
                          RoleLevelField.LEVEL_WRITE)


def acl_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(AclTest))
    return suite
