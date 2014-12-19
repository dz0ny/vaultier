from rest_framework import serializers
from accounts.serializers import MemberSerializer, UserSerializer
from .business.fields import BlobDataField
from accounts.models import User, Member
from .models import Node
from nodes.business.fields import RoleSerializer
from nodes.models import Policy
from vaultier.business.exceptions import HttpStatusValidationError


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node model
    """
    created_by = UserSerializer(read_only=True)
    perms = serializers.SerializerMethodField('get_permissions')
    membership = serializers.SerializerMethodField('get_member')
    root = serializers.SerializerMethodField('get_root')

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
        if not node.acl.has_permission('create', user):
            raise HttpStatusValidationError(http_status_code=403)

        return attrs

    def get_root(self, obj):
        return obj.get_root().pk

    def get_member(self, obj):
        user = self.context.get('request').user
        return MemberSerializer(instance=obj.get_user_member(user)).data


    # def get_member(self, obj):
    #     user = self.context.get('request').user

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


class PolicySerializer(serializers.ModelSerializer):

    member = serializers.SerializerMethodField('get_member')
    node = serializers.IntegerField(source='subject.pk')

    def get_member(self, obj):
        return MemberSerializer(instance=obj.get_user_member(self.context.get('request').user), read_only=True).data

    class Meta:
        model = Policy
        fields = ('id', 'role', 'member', 'node')
