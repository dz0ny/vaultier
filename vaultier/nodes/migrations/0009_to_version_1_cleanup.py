# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.db import connection
from . import workspace_exists


def cleanup(apps, schema_editor):
    if not workspace_exists():
        return

    cursor = connection.cursor()
    cursor.execute("""ALTER TABLE public.vaultier_member DROP CONSTRAINT workspace_id_refs_id_1255e83b;
                      DROP INDEX public.vaultier_member_workspace_id RESTRICT;
                      ALTER TABLE public.vaultier_member DROP workspace_id;""")


class Migration(migrations.Migration):

    dependencies = [
        ('nodes', '0008_to_version_1'),
    ]

    operations = [
        migrations.RunPython(cleanup),
        migrations.AlterField(
            model_name='node',
            name='type',
            field=models.IntegerField(),
            preserve_default=True,
        ),
    ]
