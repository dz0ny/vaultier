# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import bitfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('nodes', '0002_node_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Policy',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role', models.CharField(max_length=30, null=True)),
                ('mask', bitfield.models.BitField((b'read', b'write', b'create'), default=None)),
                ('principal', models.ForeignKey(to='accounts.User')),
                ('subject', models.ForeignKey(related_name=b'_policies', to='nodes.Node')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
