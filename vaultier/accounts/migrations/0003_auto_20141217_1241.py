# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0007_auto_20141217_1241'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='node',
            field=models.ForeignKey(default=None, to='nodes.Node', null=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='member',
            name='user',
            field=models.ForeignKey(related_name='membership', default=None, to='accounts.User', null=True),
            preserve_default=True,
        ),
    ]
