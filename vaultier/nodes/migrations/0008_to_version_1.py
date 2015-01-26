# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json

from django.db import migrations, connection
from accounts.models import Member
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
        node.save(force_insert=True)


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
        node.save(force_insert=True)
        _migrate_secret(node)
        _migrate_acl('card', c['id'], node)


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
        node.save(force_insert=True)
        node._vault = v['id']
        _migrate_cards(node)
        _migrate_acl('vault', v['id'], node)


def _migrate_members(workspace_node):
    cursor = connection.cursor()
    cursor.execute(
        "UPDATE vaultier_member SET node_id=%s WHERE workspace_id=%s",
        [workspace_node.pk, workspace_node._workspace])


def _migrate_acl(col, pk, node):
    cursor = connection.cursor()

    roles = {
        50: 'create',
        100: 'read',
        200: 'write'
    }
    cursor.execute("SELECT * FROM vaultier_role WHERE to_{}_id=%s".format(col), [pk])

    for r in _dictfetchall(cursor):
        node.acl.allow(roles[r['level']], Member.objects.get(pk=r['member_id']))


def migrate_from_workspaces(apps, schema_editor):

    if not workspace_exists():
        return

    cursor = connection.cursor()
    cursor.execute("ALTER TABLE public.vaultier_member ALTER COLUMN workspace_id DROP NOT NULL;")
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
        node.acl.initialize_node()
        node._workspace = w['id']
        nodes.append(node)
        _migrate_members(node)
        _migrate_vaults(node)
        _migrate_acl('workspace', w['id'], node)


class Migration(migrations.Migration):
    dependencies = [
        ('nodes', '0007_auto_20141217_1241'),
        ('accounts', '0006_auto_20150122_1320')
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='policy',
            unique_together=set([('subject', 'principal')]),
        ),
        migrations.RunPython(migrate_from_workspaces),
    ]
