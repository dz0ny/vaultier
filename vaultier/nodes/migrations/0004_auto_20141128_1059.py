# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0003_remove_node_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='blob_data',
            field=models.FileField(null=True, upload_to=b'', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='node',
            name='blob_meta',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='node',
            name='data',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
