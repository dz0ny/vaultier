# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Workspace.deleted_at'
        db.add_column(u'vaultier_workspace', 'deleted_at',
                      self.gf('django.db.models.fields.DateTimeField')(null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Workspace.deleted_at'
        db.delete_column(u'vaultier_workspace', 'deleted_at')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'vaultier.acl': {
            'Meta': {'object_name': 'Acl'},
            'direction': ('vaultier.models.acl.fields.AclDirectionField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('vaultier.models.role.fields.RoleLevelField', [], {}),
            'role': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Role']"}),
            'to_card': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Card']", 'null': 'True', 'blank': 'True'}),
            'to_vault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Vault']", 'null': 'True', 'blank': 'True'}),
            'to_workspace': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Workspace']", 'null': 'True', 'blank': 'True'}),
            'type': ('vaultier.models.object_reference.ObjectReferenceTypeField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']"})
        },
        'vaultier.card': {
            'Meta': {'object_name': 'Card'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']", 'on_delete': 'models.PROTECT'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'vault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Vault']"})
        },
        'vaultier.member': {
            'Meta': {'object_name': 'Member'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'members_created'", 'on_delete': 'models.PROTECT', 'to': "orm['vaultier.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'invitation_email': ('modelext.lowercasefield.lowercasefield.LowerCaseCharField', [], {'max_length': '1024', 'null': 'True'}),
            'invitation_hash': ('django.db.models.fields.CharField', [], {'max_length': '64', 'unique': 'True', 'null': 'True'}),
            'status': ('vaultier.models.member.fields.MemberStatusField', [], {'default': '3'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'membership'", 'null': 'True', 'to': "orm['vaultier.User']"}),
            'workspace': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'membership'", 'to': "orm['vaultier.Workspace']"}),
            'workspace_key': ('django.db.models.fields.CharField', [], {'max_length': '4096'})
        },
        'vaultier.role': {
            'Meta': {'object_name': 'Role'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'roles_created'", 'on_delete': 'models.PROTECT', 'to': "orm['vaultier.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('vaultier.models.role.fields.RoleLevelField', [], {}),
            'member': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Member']"}),
            'to_card': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Card']", 'null': 'True', 'blank': 'True'}),
            'to_vault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Vault']", 'null': 'True', 'blank': 'True'}),
            'to_workspace': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Workspace']", 'null': 'True', 'blank': 'True'}),
            'type': ('vaultier.models.object_reference.ObjectReferenceTypeField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'vaultier.secret': {
            'Meta': {'object_name': 'Secret'},
            'blob': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['vaultier.SecretBlob']", 'unique': 'True', 'null': 'True', 'on_delete': 'models.SET_NULL', 'blank': 'True'}),
            'card': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Card']"}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']", 'on_delete': 'models.PROTECT'}),
            'data': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'type': ('vaultier.models.secret.fields.SecretTypeField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'vaultier.secretblob': {
            'Meta': {'object_name': 'SecretBlob', 'db_table': "u'vaultier_secret_blob'"},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']", 'on_delete': 'models.PROTECT'}),
            'data': ('django.db.models.fields.TextField', [], {'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'vaultier.slug': {
            'Meta': {'object_name': 'Slug'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'slug': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255', 'db_index': 'True'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'vaultier.token': {
            'Meta': {'object_name': 'Token'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'token': ('django.db.models.fields.CharField', [], {'max_length': '64'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']"})
        },
        'vaultier.user': {
            'Meta': {'object_name': 'User'},
            'email': ('modelext.lowercasefield.lowercasefield.LowerCaseCharField', [], {'unique': 'True', 'max_length': '255'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'nickname': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'public_key': ('django.db.models.fields.CharField', [], {'max_length': '1024'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"})
        },
        'vaultier.vault': {
            'Meta': {'object_name': 'Vault'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']", 'on_delete': 'models.PROTECT'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'workspace': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.Workspace']"})
        },
        'vaultier.version': {
            'Meta': {'object_name': 'Version'},
            'action_id': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True'}),
            'action_name': ('django.db.models.fields.CharField', [], {'max_length': '16', 'null': 'True'}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']", 'null': 'True', 'on_delete': 'models.PROTECT'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'manipulator_id': ('modelext.version.model.VersionManipulatorIdField', [], {'max_length': '255'}),
            'revert_data': ('jsonfield.fields.JSONField', [], {}),
            'revert_fields': ('jsonfield.fields.JSONField', [], {}),
            'revert_repr': ('django.db.models.fields.TextField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'versioned_id': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'versioned_parent_id': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'versioned_parent_type': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'version_versioned_parent'", 'to': u"orm['contenttypes.ContentType']"}),
            'versioned_type': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'version_versioned'", 'to': u"orm['contenttypes.ContentType']"})
        },
        'vaultier.workspace': {
            'Meta': {'object_name': 'Workspace'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'created_by': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['vaultier.User']", 'on_delete': 'models.PROTECT'}),
            'deleted_at': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['vaultier']