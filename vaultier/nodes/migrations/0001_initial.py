# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20141024_0838'),
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created_at', models.DateTimeField(editable=False)),
                ('updated_at', models.DateTimeField(editable=False)),
                ('meta', models.TextField()),
                ('type', models.IntegerField(choices=[(1, b'Directory'), (2, b'File')])),
                ('data', models.FileField(null=True, upload_to=b'', blank=True)),
                ('color', models.CharField(max_length=7, null=True, blank=True)),
                ('enc_version', models.IntegerField()),
                ('lft', models.PositiveIntegerField(editable=False, db_index=True)),
                ('rght', models.PositiveIntegerField(editable=False, db_index=True)),
                ('tree_id', models.PositiveIntegerField(editable=False, db_index=True)),
                ('level', models.PositiveIntegerField(editable=False, db_index=True)),
                ('created_by', models.ForeignKey(related_name=b'nodes', to='accounts.User')),
                ('parent', mptt.fields.TreeForeignKey(related_name=b'children', blank=True, to='nodes.Node', null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
