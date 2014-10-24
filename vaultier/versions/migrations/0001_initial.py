# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
import jsonfield.fields
import libs.version.model


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20141024_0838'),
        ('contenttypes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Version',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('action_id', models.PositiveIntegerField(null=True)),
                ('action_name', models.CharField(max_length=16, null=True)),
                ('manipulator_id', libs.version.model.VersionManipulatorIdField(max_length=255)),
                ('revert_data', jsonfield.fields.JSONField(help_text=b'The serialized form of this version of the model.')),
                ('revert_fields', jsonfield.fields.JSONField(help_text=b'The serialized form of affected model fields.')),
                ('versioned_id', models.PositiveIntegerField()),
                ('versioned_related_id', models.PositiveIntegerField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='accounts.User', null=True)),
                ('versioned_related_type', models.ForeignKey(related_name=b'version_versioned_related', to='contenttypes.ContentType', null=True)),
                ('versioned_type', models.ForeignKey(related_name=b'version_versioned', to='contenttypes.ContentType')),
            ],
            options={
                'db_table': 'vaultier_version',
            },
            bases=(models.Model,),
        ),
    ]
