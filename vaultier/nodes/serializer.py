from rest_framework import serializers
from .models import Node


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node model
    """
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        write_only_fields = ('lft', 'rght')
        model = Node
