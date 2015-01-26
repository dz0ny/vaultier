# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20150120_1319'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='member',
            unique_together=set([('user', 'node')]),
        ),
    ]
