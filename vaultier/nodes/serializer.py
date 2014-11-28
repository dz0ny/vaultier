from rest_framework import serializers
from .business.fields import BlobDataField
from .models import Node


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node model
    """
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        exclude = ('lft', 'rght', 'level', 'tree_id', 'blob_data', 'blob_meta')
        model = Node


class NodeBlobSerializer(serializers.ModelSerializer):
    """
    Blob Serializer for Node model
    """
    blob_data = BlobDataField()

    class Meta:
        fields = ('id', 'blob_meta', 'blob_data')
        model = Node
