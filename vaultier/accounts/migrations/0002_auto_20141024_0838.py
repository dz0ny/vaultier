# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workspaces', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='workspace',
            field=models.ForeignKey(related_name=b'membership', to='workspaces.Workspace'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='lostkey',
            name='created_by',
            field=models.ForeignKey(related_name=b'distracted', on_delete=django.db.models.deletion.PROTECT, to='accounts.User'),
            preserve_default=True,
        ),
    ]
