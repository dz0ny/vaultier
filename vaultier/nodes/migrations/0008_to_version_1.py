# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.db import migrations, connection
from nodes.models import Node
from . import workspace_exists


def _dictfetchall(cursor):
    """
    Returns all rows from a cursor as a dict

    :param cursor:
    :return:
    """
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]


def _migrate_secret(card_node):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM vaultier_secret WHERE card_id = %s",
                   [card_node._card])

    for c in _dictfetchall(cursor):
        node = Node(
            name=c['name'],
            created_by_id=c['created_by_id'],
            parent=card_node,
            type=2
        )
        node.save()


def _migrate_cards(vault_node):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM vaultier_card WHERE vault_id = %s",
                   [vault_node._vault])

    for c in _dictfetchall(cursor):
        node = Node(
            name=c['name'],
            meta=json.dumps({'description': c['description']}),
            created_by_id=c['created_by_id'],
            parent=vault_node,
            type=1
        )
        node._card = c['id']
        node.save()
        _migrate_secret(node)


def _migrate_vaults(workspace_node):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM vaultier_vault WHERE workspace_id = %s",
                   [workspace_node._workspace])
    for v in _dictfetchall(cursor):
        node = Node(
            name=v['name'],
            meta=json.dumps({'description': v['description']}),
            created_by_id=v['created_by_id'],
            color=v['color'],
            parent=workspace_node,
            type=1
        )
        node.save()
        node._vault = v['id']
        _migrate_cards(node)


def _migrate_members(workspace_node):
    cursor = connection.cursor()
    cursor.execute(
        "UPDATE vaultier_member SET node_id=%s WHERE workspace_id=%s",
        [workspace_node.pk, workspace_node._workspace])





def migrate_from_workspaces(apps, schema_editor):

    if not workspace_exists():
        return

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM vaultier_workspace")
    nodes = []
    for w in _dictfetchall(cursor):
        node = Node(
            name=w['name'],
            meta=json.dumps({'description': w['description']}),
            created_by_id=w['created_by_id'],
            type=1


        )
        node.save()
        node._workspace = w['id']
        nodes.append(node)
        _migrate_vaults(node)
        _migrate_members(node)


class Migration(migrations.Migration):
    dependencies = [
        ('nodes', '0007_auto_20141217_1241'),
        ('accounts', '0004_auto_20141217_1338')
    ]

    operations = [
        migrations.RunPython(migrate_from_workspaces),
    ]
