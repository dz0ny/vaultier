from rest_framework import serializers
from .business.fields import BlobDataField
from accounts.models import User
from .models import Node
from vaultier.business.exceptions import HttpStatusValidationError


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node model
    """
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    roles = serializers.SerializerMethodField('get_roles')
    permissions = serializers.SerializerMethodField('get_permissions')

    def validate_parent(self, attrs, source):
        """
        @todo: Move this to API (permission classes) asap

        :param source:
        :param attrs:
        :return:
        """
        node = attrs[source]
        if not node:
            return attrs
        user = self.context.get('request').user
        assert isinstance(user, User)
        if not node.acl.has_permission('create', user):
            raise HttpStatusValidationError(http_status_code=403)

        return attrs

    def get_roles(self, obj):
        user = self.context.get('request').user
        return obj.acl.get_roles(user)

    def get_permissions(self, obj):
        user = self.context.get('request').user
        return obj.acl.get_permissions(user)

    class Meta:
        exclude = ('lft', 'rght', 'level', 'tree_id', 'blob_data')
        model = Node


class NodeBlobSerializer(serializers.ModelSerializer):
    """
    Blob Serializer for Node model
    """
    blob_data = BlobDataField()

    class Meta:
        fields = ('id', 'meta', 'blob_data')
        model = Node
