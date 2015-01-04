# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20141217_1241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='node',
            field=models.ForeignKey(to='nodes.Node', null=True, default=None),
            preserve_default=True,
        ),
    ]
