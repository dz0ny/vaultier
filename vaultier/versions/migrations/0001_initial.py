# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Version'
        db.create_table(u'vaultier_version', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('action_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True)),
            ('action_name', self.gf('django.db.models.fields.CharField')(max_length=16, null=True)),
            ('manipulator_id', self.gf('libs.version.model.VersionManipulatorIdField')(max_length=255)),
            ('revert_data', self.gf('jsonfield.fields.JSONField')()),
            ('revert_fields', self.gf('jsonfield.fields.JSONField')()),
            ('versioned_type', self.gf('django.db.models.fields.related.ForeignKey')(related_name='version_versioned', to=orm['contenttypes.ContentType'])),
            ('versioned_id', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('versioned_related_type', self.gf('django.db.models.fields.related.ForeignKey')(related_name='version_versioned_related', null=True, to=orm['contenttypes.ContentType'])),
            ('versioned_related_id', self.gf('django.db.models.fields.PositiveIntegerField')(null=True)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('created_by', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['accounts.User'], null=True, on_delete=models.PROTECT)),
        ))
        db.send_create_signal(u'versions', ['Version'])


    def backwards(self, orm):
        # Deleting model 'Version'
        db.delete_table(u'vaultier_version')


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
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'versions.version': {
            'Meta': {'object_name': 'Version', 'db_table': "u'vaultier_version'"},
            'action_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True'}),
            'action_name': ('django.db.models.fields.CharField', [], {'max_length': '16', 'null': 'True'}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['accounts.User']", 'null': 'True', 'on_delete': 'models.PROTECT'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'manipulator_id': ('libs.version.model.VersionManipulatorIdField', [], {'max_length': '255'}),
            'revert_data': ('jsonfield.fields.JSONField', [], {}),
            'revert_fields': ('jsonfield.fields.JSONField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'versioned_id': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'versioned_related_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True'}),
            'versioned_related_type': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'version_versioned_related'", 'null': 'True', 'to': u"orm['contenttypes.ContentType']"}),
            'versioned_type': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'version_versioned'", 'to': u"orm['contenttypes.ContentType']"})
        }
    }

    complete_apps = ['versions']