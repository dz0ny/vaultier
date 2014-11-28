# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0002_node_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='node',
            name='data',
        ),
    ]
