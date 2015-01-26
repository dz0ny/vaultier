# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20141217_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='node',
            field=models.ForeignKey(related_name='membership', default=None, to='nodes.Node', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='member',
            name='user',
            field=models.ForeignKey(default=None, to='accounts.User', null=True),
            preserve_default=True,
        ),
    ]
