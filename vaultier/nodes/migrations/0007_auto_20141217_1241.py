# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import bitfield.models


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0006_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='enc_version',
            field=models.IntegerField(default=1),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='policy',
            name='mask',
            field=bitfield.models.BitField([b'read', b'write', b'create', b'update', b'delete', b'invite'], default=None),
            preserve_default=True,
        ),
    ]
