from rest_framework import serializers
from .models import Node


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node model
    """
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        exclude = ('lft', 'rght', 'level', 'tree_id')
        model = Node
