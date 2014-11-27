from django.apps import AppConfig
from django.db.models.signals import post_save, pre_delete

from nodes.business.notifier import NodeNotifier
from nodes.models import Node


class NodeConfig(AppConfig):
    name = 'nodes'
    verbose_name = "nodes"

    def ready(self):
        """
        Register signals for Notifier

        :return:
        """
        post_save.connect(NodeNotifier.node_saved, sender=Node)
        pre_delete.connect(NodeNotifier.node_saved, sender=Node)
