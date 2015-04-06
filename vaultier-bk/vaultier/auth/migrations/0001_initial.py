# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import vaultier.base.utils.lowercasefield.lowercasefield
import vaultier.base.utils.changes.changes
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(null=True, verbose_name='last login', blank=True)),
                ('nickname', models.CharField(max_length=255)),
                ('public_key', models.CharField(max_length=1024)),
                ('email', vaultier.base.utils.lowercasefield.lowercasefield.LowerCaseCharField(unique=True, max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'vaultier_user',
            },
            bases=(vaultier.base.utils.changes.changes.ChangesMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('token', models.CharField(unique=True, max_length=64, db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('last_used_at', models.DateTimeField(null=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'vaultier_token',
            },
            bases=(vaultier.base.utils.changes.changes.ChangesMixin, models.Model),
        ),
    ]
