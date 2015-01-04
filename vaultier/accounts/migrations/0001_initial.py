# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import libs.changes.changes
import accounts.business.fields
import libs.lowercasefield.lowercasefield
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
                ('nickname', models.CharField(max_length=255)),
                ('public_key', models.CharField(max_length=1024)),
                ('email', libs.lowercasefield.lowercasefield.LowerCaseCharField(unique=True, max_length=255)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'vaultier_user',
            },
            bases=(libs.changes.changes.ChangesMixin, models.Model),
        ),
        migrations.CreateModel(
            name='LostKey',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('hash', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('expires_at', models.DateTimeField()),
                ('used', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(related_name=b'distracted', on_delete=django.db.models.deletion.PROTECT, to='accounts.User'))
            ],
            options={
                'db_table': 'vaultier_lost_key',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('invitation_hash', models.CharField(max_length=64, unique=True, null=True)),
                ('invitation_email', libs.lowercasefield.lowercasefield.LowerCaseCharField(max_length=1024, null=True)),
                ('workspace_key', models.CharField(max_length=4096)),
                ('status', accounts.business.fields.MemberStatusField(default=3, choices=[(100, b'INVITED'), (200, b'MEMBER_WITHOUT_WORKSPACE_KEY'), (300, b'MEMBER'), (400, b'MEMBER_WITH_LOST_KEY')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(related_name=b'members_created', on_delete=django.db.models.deletion.PROTECT, to='accounts.User')),
                ('user', models.ForeignKey(related_name=b'membership', to='accounts.User', null=True)),
            ],
            options={
                'db_table': 'vaultier_member',
            },
            bases=(libs.changes.changes.ChangesMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('token', models.CharField(unique=True, max_length=64, db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('last_used_at', models.DateTimeField(null=True)),
                ('user', models.ForeignKey(to='accounts.User')),
            ],
            options={
                'db_table': 'vaultier_token',
            },
            bases=(libs.changes.changes.ChangesMixin, models.Model),
        ),
    ]
