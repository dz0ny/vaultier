# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
import libs.changes.changes
import secrets.models
import secrets.business.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20141024_0838'),
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Secret',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('name', models.CharField(default=b'', max_length=255, null=True, blank=True)),
                ('type', secrets.business.fields.SecretTypeField(choices=[(100, b'NOTE'), (300, b'FILE'), (200, b'PASSWORD')])),
                ('data', models.TextField(null=True, blank=True)),
                ('blob_data', models.FileField(null=True, upload_to=secrets.models.get_blob_data_filename, blank=True)),
                ('blob_meta', models.TextField(null=True, blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('card', models.ForeignKey(to='cards.Card')),
                ('created_by', models.ForeignKey(to='accounts.User', on_delete=django.db.models.deletion.PROTECT)),
            ],
            options={
                'db_table': 'vaultier_secret',
            },
            bases=(libs.changes.changes.ChangesMixin, models.Model),
        ),
    ]
