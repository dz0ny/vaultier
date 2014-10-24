# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import libs.changes.changes
import acls.business.fields
import django.db.models.deletion
import vaultier.business.fields
import vaultier.business.reference


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0001_initial'),
        ('accounts', '0002_auto_20141024_0838'),
        ('cards', '0001_initial'),
        ('vaults', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Acl',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', vaultier.business.fields.ObjectReferenceTypeField(choices=[(100, b'WORKSPACE'), (200, b'VAULT'), (300, b'CARD')])),
                ('level', acls.business.fields.RoleLevelField(choices=[(50, b'CREATE'), (100, b'READ'), (200, b'WRITE')])),
                ('direction', acls.business.fields.AclDirectionField(choices=[(-1, b'UP'), (0, b'CURRENT'), (1, b'DOWN')])),
            ],
            options={
                'db_table': 'vaultier_acl',
            },
            bases=(vaultier.business.reference.ObjectReference, models.Model),
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', vaultier.business.fields.ObjectReferenceTypeField(choices=[(100, b'WORKSPACE'), (200, b'VAULT'), (300, b'CARD')])),
                ('level', acls.business.fields.RoleLevelField(choices=[(50, b'CREATE'), (100, b'READ'), (200, b'WRITE')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(related_name=b'roles_created', on_delete=django.db.models.deletion.PROTECT, to='accounts.User')),
                ('member', models.ForeignKey(to='accounts.Member')),
                ('to_card', models.ForeignKey(blank=True, to='cards.Card', null=True)),
                ('to_vault', models.ForeignKey(blank=True, to='vaults.Vault', null=True)),
                ('to_workspace', models.ForeignKey(blank=True, to='workspaces.Workspace', null=True)),
            ],
            options={
                'db_table': 'vaultier_role',
            },
            bases=(libs.changes.changes.ChangesMixin, vaultier.business.reference.ObjectReference, models.Model),
        ),
        migrations.AddField(
            model_name='acl',
            name='role',
            field=models.ForeignKey(to='acls.Role'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='acl',
            name='to_card',
            field=models.ForeignKey(blank=True, to='cards.Card', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='acl',
            name='to_vault',
            field=models.ForeignKey(blank=True, to='vaults.Vault', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='acl',
            name='to_workspace',
            field=models.ForeignKey(blank=True, to='workspaces.Workspace', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='acl',
            name='user',
            field=models.ForeignKey(to='accounts.User'),
            preserve_default=True,
        ),
    ]
