# -*- coding: utf-8 -*-
from django.test.testcases import TransactionTestCase
from django.utils import unittest
from django.utils.unittest.suite import TestSuite
from accounts.models import User
from cards.models import Card
from libs.version.context import version_context_manager
from slugs.models import Slug
from vaults.models import Vault
from workspaces.models import Workspace


class SlugTest(TransactionTestCase):
    def setUp(self):
        version_context_manager.set_enabled(False)

    def test_010_workspace_slug(self):
        u = User(email="jan@rclick.cz")
        u.save()

        # create 1
        # on create new slug should be created
        w1 = Workspace(name="Workspace", created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'workspace')
        self.assertEquals(Slug.objects.all().count(), 1)

        # create 2
        # on create new slug should be created
        w2 = Workspace(name="Workspace", created_by=u)
        w2._user = u
        w2.save()
        self.assertEquals(w2.slug, 'workspace-2')
        self.assertEquals(Slug.objects.all().count(), 2)

        # rename 2
        # on update new slug should be created
        w2.name = 'New Workspace Name'
        w2.save()
        self.assertEquals(w2.slug, 'new-workspace-name')
        self.assertEquals(Slug.objects.all().count(), 3)

        # we preserve permalinks for softdeleted objects
        w2.softdelete()
        self.assertEquals(Slug.objects.all().count(), 3)
        # delete all

        # slugs are removed after delete
        Workspace.objects.include_deleted().delete()
        self.assertEquals(Slug.objects.all().count(), 0)

    def test_020_vault_slug(self):
        u = User(email="jan@rclick.cz")
        u.save()

        w1 = Workspace(name="Workspace", created_by=u)
        w1._user = u
        w1.save()

        prereqs_slug_count = 1

        # create 1
        # on create new slug should be created
        v1 = Vault(name="Vault", created_by=u)
        v1.workspace = w1
        v1._user = u
        v1.save()
        self.assertEquals(v1.slug, 'vault')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 1)

        # create 2
        # on create new slug should be created
        v2 = Vault(name="Vault", created_by=u)
        v2.workspace = w1
        v2._user = u
        v2.save()
        self.assertEquals(v2.slug, 'vault-2')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 2)

        # rename 2
        # on update new slug should be created
        v2.name = 'New Vault Name'
        v2.save()
        self.assertEquals(v2.slug, 'new-vault-name')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 3)

        # we preserve permalinks for softdeleted objects
        v2.softdelete()
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 3)

        # delete all, only workspace slug should stay
        Vault.objects.include_deleted().delete()
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count)

    def test_030_card_slug(self):
        u = User(email="jan@rclick.cz")
        u.save()

        w1 = Workspace(name="Workspace", created_by=u)
        w1._user = u
        w1.save()

        v1 = Vault(name="Vault", created_by=u)
        v1.workspace = w1
        v1._user = u
        v1.save()

        prereqs_slug_count = 2

        # create 1
        # on create new slug should be created
        c1 = Card(name="Card", created_by=u)
        c1.vault = v1
        c1._user = u
        c1.save()
        self.assertEquals(c1.slug, 'card')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 1)

        # create 2
        # on create new slug should be created
        c2 = Card(name="Card", created_by=u)
        c2.vault = v1
        c2._user = u
        c2.save()
        self.assertEquals(c2.slug, 'card-2')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 2)

        # rename 2
        # on update new slug should be created
        c2.name = 'New Card Name'
        c2.save()
        self.assertEquals(c2.slug, 'new-card-name')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 3)

        # we preserve permalinks for softdeleted objects
        c2.softdelete()
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 3)

        # delete all, only workspace slug should stay
        Card.objects.include_deleted().delete()
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count)

    def test_040_slug_features(self):
        u = User(email="jan@rclick.cz")
        u.save()

        # support empty names
        w1 = Workspace(name="", created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'workspace')

        # support empty names
        w1 = Workspace(name="", created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'workspace-2')

        # support numeric names
        w1 = Workspace(name=5, created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'n5')

        # support numeric names
        w1 = Workspace(name=5, created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'n5-2')

        # support numeric names
        w1 = Workspace(name=5.5, created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'n55')

        # support numeric names
        w1 = Workspace(name=-6.6, created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'n66')

        # support numeric names
        w1 = Workspace(name='+5.5.-5', created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'n555')

    def test_050_renaming(self):
        u = User(email="jan@rclick.cz")
        u.save()

        w1 = Workspace(name="original", created_by=u)
        w1._user = u
        w1.save()

        w1.name = 'renamed'
        w1.save()
        self.assertEquals(w1.slug, 'renamed')
        self.assertEquals(Slug.objects.all().count(), 2)

        w1.name = 'original'
        w1.save()
        self.assertEquals(w1.slug, 'original')
        self.assertEquals(Slug.objects.all().count(), 2)

    def test_060_slug_can_be_processed_from_mb_characters(self):
        u = User(email="jan@rclick.cz")
        u.save()

        # create 1
        # on create new slug should be created
        w1 = Workspace(name=u"ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ", created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, 'acdeeinorstuuyz')
        self.assertEquals(Slug.objects.all().count(), 1)

        prereqs_slug_count = 1

        v1 = Vault(name=u"Vault ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ", created_by=u)
        v1.workspace = w1
        v1._user = u
        v1.save()
        self.assertEquals(v1.slug, 'vault-acdeeinorstuuyz')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 1)

    def test_070_slug_can_be_processed_from_numeric_values(self):
        u = User(email="jan@rclick.cz")
        u.save()

        # create 1
        # on create new slug should be created
        w1 = Workspace(name=125, created_by=u)
        w1._user = u
        w1.save()
        self.assertEquals(w1.slug, u'n125')
        self.assertEquals(Slug.objects.all().count(), 1)

        prereqs_slug_count = 1

        v1 = Vault(name="Vault 125", created_by=u)
        v1.workspace = w1
        v1._user = u
        v1.save()
        self.assertEquals(v1.slug, 'vault-125')
        self.assertEquals(Slug.objects.all().count(), prereqs_slug_count + 1)


def slug_suite():
    suite = TestSuite()
    suite.addTest(unittest.TestLoader().loadTestsFromTestCase(SlugTest))
    return suite
