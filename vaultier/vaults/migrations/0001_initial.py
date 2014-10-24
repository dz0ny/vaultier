# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
import libs.changes.changes


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0001_initial'),
        ('accounts', '0002_auto_20141024_0838'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vault',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('name', models.CharField(max_length=255)),
                ('color', models.CharField(default=b'blue', max_length=30)),
                ('slug', models.CharField(default=b'', max_length=255)),
                ('description', models.CharField(max_length=1024, null=True, blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(to='accounts.User', on_delete=django.db.models.deletion.PROTECT)),
                ('workspace', models.ForeignKey(to='workspaces.Workspace')),
            ],
            options={
                'db_table': 'vaultier_vault',
            },
            bases=(libs.changes.changes.ChangesMixin, models.Model),
        ),
    ]
