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

    def validate(self, attrs):
        """
        In case of 'field type Node' is data field required
        """
        if attrs.get('type') and int(attrs.get('type')) == Node.TYPE_FILE:
            if not attrs.get('data'):
                msg = 'You have to provide file data.'
                raise serializers.ValidationError(msg)
        return attrs
