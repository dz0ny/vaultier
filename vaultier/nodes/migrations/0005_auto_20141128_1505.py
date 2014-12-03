# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0004_auto_20141128_1059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='node',
            name='blob_meta',
        ),
        migrations.AlterField(
            model_name='node',
            name='meta',
            field=models.TextField(null=True, blank=True),
        ),
    ]
