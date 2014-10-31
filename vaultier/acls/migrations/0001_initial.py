# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    depends_on = (('vaults', '0001_initial'), ('cards', '0001_initial'))

    def forwards(self, orm):
        # Adding model 'Acl'
        db.create_table(u'vaultier_acl', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('type', self.gf('vaultier.business.fields.ObjectReferenceTypeField')()),
            ('to_workspace', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['workspaces.Workspace'], null=True, blank=True)),
            ('to_vault', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['vaults.Vault'], null=True, blank=True)),
            ('to_card', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['cards.Card'], null=True, blank=True)),
            ('level', self.gf('acls.business.fields.RoleLevelField')()),
            ('direction', self.gf('acls.business.fields.AclDirectionField')()),
            ('role', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['acls.Role'])),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['accounts.User'])),
        ))
        db.send_create_signal(u'acls', ['Acl'])

        # Adding model 'Role'
        db.create_table(u'vaultier_role', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('type', self.gf('vaultier.business.fields.ObjectReferenceTypeField')()),
            ('to_workspace', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['workspaces.Workspace'], null=True, blank=True)),
            ('to_vault', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['vaults.Vault'], null=True, blank=True)),
            ('to_card', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['cards.Card'], null=True, blank=True)),
            ('member', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['accounts.Member'])),
            ('level', self.gf('acls.business.fields.RoleLevelField')()),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('created_by', self.gf('django.db.models.fields.related.ForeignKey')(related_name='roles_created', on_delete=models.PROTECT, to=orm['accounts.User'])),
        ))
        db.send_create_signal(u'acls', ['Role'])


    def backwards(self, orm):
        # Deleting model 'Acl'
        db.delete_table(u'vaultier_acl')

        # Deleting model 'Role'
        db.delete_table(u'vaultier_role')


    models = {
        u'accounts.member': {
            'Meta': {'object_name': 'Member', 'db_table': "u'vaultier_member'"},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'members_created'", 'on_delete': 'models.PROTECT', 'to': u"orm['accounts.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'invitation_email': ('libs.lowercasefield.lowercasefield.LowerCaseCharField', [], {'max_length': '1024', 'null': 'True'}),
            'invitation_hash': ('django.db.models.fields.CharField', [], {'max_length': '64', 'unique': 'True', 'null': 'True'}),
            'status': ('accounts.business.fields.MemberStatusField', [], {'default': '3'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'membership'", 'null': 'True', 'to': u"orm['accounts.User']"}),
            'workspace': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'membership'", 'to': u"orm['workspaces.Workspace']"}),
            'workspace_key': ('django.db.models.fields.CharField', [], {'max_length': '4096'})
        },
        u'accounts.user': {
            'Meta': {'object_name': 'User', 'db_table': "u'vaultier_user'"},
            'email': ('libs.lowercasefield.lowercasefield.LowerCaseCharField', [], {'unique': 'True', 'max_length': '255'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'nickname': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'public_key': ('django.db.models.fields.CharField', [], {'max_length': '1024'})
        },
        u'acls.acl': {
            'Meta': {'object_name': 'Acl', 'db_table': "u'vaultier_acl'"},
            'direction': ('acls.business.fields.AclDirectionField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('acls.business.fields.RoleLevelField', [], {}),
            'role': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['acls.Role']"}),
            'to_card': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['cards.Card']", 'null': 'True', 'blank': 'True'}),
            'to_vault': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['vaults.Vault']", 'null': 'True', 'blank': 'True'}),
            'to_workspace': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['workspaces.Workspace']", 'null': 'True', 'blank': 'True'}),
            'type': ('vaultier.business.fields.ObjectReferenceTypeField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.User']"})
        },
        u'acls.role': {
            'Meta': {'object_name': 'Role', 'db_table': "u'vaultier_role'"},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'roles_created'", 'on_delete': 'models.PROTECT', 'to': u"orm['accounts.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('acls.business.fields.RoleLevelField', [], {}),
            'member': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.Member']"}),
            'to_card': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['cards.Card']", 'null': 'True', 'blank': 'True'}),
            'to_vault': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['vaults.Vault']", 'null': 'True', 'blank': 'True'}),
            'to_workspace': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['workspaces.Workspace']", 'null': 'True', 'blank': 'True'}),
            'type': ('vaultier.business.fields.ObjectReferenceTypeField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'cards.card': {
            'Meta': {'object_name': 'Card', 'db_table': "u'vaultier_card'"},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.User']", 'on_delete': 'models.PROTECT'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'vault': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['vaults.Vault']"})
        },
        u'vaults.vault': {
            'Meta': {'object_name': 'Vault', 'db_table': "u'vaultier_vault'"},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.User']", 'on_delete': 'models.PROTECT'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'workspace': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['workspaces.Workspace']"})
        },
        u'workspaces.workspace': {
            'Meta': {'object_name': 'Workspace', 'db_table': "u'vaultier_workspace'"},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.User']", 'on_delete': 'models.PROTECT'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['acls']