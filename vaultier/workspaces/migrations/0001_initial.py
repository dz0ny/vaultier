# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
import libs.changes.changes


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workspace',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('name', models.CharField(max_length=255)),
                ('slug', models.CharField(default=b'', max_length=255)),
                ('description', models.CharField(max_length=1024, null=True, blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(to='accounts.User', on_delete=django.db.models.deletion.PROTECT)),
            ],
            options={
                'db_table': 'vaultier_workspace',
            },
            bases=(libs.changes.changes.ChangesMixin, models.Model),
        ),
    ]
