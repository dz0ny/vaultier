# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Secret'
        db.create_table(u'vaultier_secret', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('deleted_at', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=255, null=True, blank=True)),
            ('type', self.gf('secrets.business.fields.SecretTypeField')()),
            ('data', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('blob_data', self.gf('django.db.models.fields.files.FileField')(max_length=100, null=True, blank=True)),
            ('blob_meta', self.gf('django.db.models.fields.TextField')(null=True, blank=True)),
            ('card', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['cards.Card'])),
            ('created_by', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['accounts.User'], on_delete=models.PROTECT)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'secrets', ['Secret'])


    def backwards(self, orm):
        # Deleting model 'Secret'
        db.delete_table(u'vaultier_secret')


    models = {
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
        u'secrets.secret': {
            'Meta': {'object_name': 'Secret', 'db_table': "u'vaultier_secret'"},
            'blob_data': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'blob_meta': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'card': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['cards.Card']"}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.User']", 'on_delete': 'models.PROTECT'}),
            'data': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'type': ('secrets.business.fields.SecretTypeField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
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

    complete_apps = ['secrets']