# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='name',
            field=models.CharField(default='should-be-hash', max_length=255),
            preserve_default=False,
        ),
    ]
