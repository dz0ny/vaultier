from django.apps import AppConfig
from django.db.models.signals import post_save

from nodes.business.signals import trigger_node_signal
from nodes.models import Node


class NodeConfig(AppConfig):
    name = 'nodes'
    verbose_name = "nodes"

    def ready(self):
        post_save.connect(trigger_node_signal, sender=Node)
