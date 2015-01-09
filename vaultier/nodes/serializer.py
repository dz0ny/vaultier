from rest_framework import serializers
from accounts.serializers import MemberSerializer, UserSerializer, \
    MemberWorkspaceKeySerializer
from .business.fields import BlobDataField
from accounts.models import User, Member
from .models import Node
from nodes.business.fields import RoleSerializer
from nodes.models import Policy
from vaultier.business.exceptions import HttpStatusValidationError
from vaultier.business.fields import SerializerMethodWriteableField


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node model
    """
    created_by = UserSerializer(read_only=True)
    perms = serializers.SerializerMethodField('get_permissions')
    membership = serializers.SerializerMethodField('get_member')
    root = serializers.SerializerMethodField('get_root')
    blob_meta = serializers.CharField(source='meta')

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
        if not node.acl.has_permission('create', Member.objects.to_node(user, node)):
            raise HttpStatusValidationError(http_status_code=403)

        return attrs

    def get_root(self, obj):
        return obj.get_root().pk

    def get_member(self, obj):
        user = self.context.get('request').user
        s = MemberWorkspaceKeySerializer(instance=obj.get_user_member(user))
        return s.data

    def get_roles(self, obj):
        user = self.context.get('request').user
        return obj.acl.get_roles(obj.get_user_member(user))

    def get_permissions(self, obj):
        user = self.context.get('request').user
        return obj.acl.get_permissions(obj.get_user_member(user))

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

    level = serializers.CharField(source='role')
    member = SerializerMethodWriteableField('get_member')
    node = serializers.IntegerField(source='subject.pk', read_only=True)

    def get_member(self, obj):
        return MemberSerializer(instance=obj.principal, read_only=True).data

    def validate_member(self, attrs, source):
        if source not in attrs:
            raise serializers.ValidationError('Member is required')

        try:
            member = Member.objects.get(pk=attrs[source])
        except Member.DoesNotExist:
            raise serializers.ValidationError('Member object does not exist')
        attrs['principal_id'] = member.pk
        return attrs

    class Meta:
        model = Policy
        fields = ('id', 'level', 'member', 'node')
