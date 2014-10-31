from rest_framework import serializers

from accounts.business.fields import MemberStatusField
from accounts.models import Member
from accounts.serializers import RelatedUserSerializer, MemberSerializer, \
    RelatedMemberSerializer
from acls.models import Role
from vaultier.business.fields import PermsField
from workspaces.models import Workspace


class InvitationRoleSerializer(serializers.ModelSerializer):

    created_by = serializers.SerializerMethodField('get_created_by')
    to_type = serializers.SerializerMethodField('get_to_type')
    to_name = serializers.SerializerMethodField('get_to_name')

    class Meta:
        model = Role
        fields = ('id', 'to_type', 'to_name', 'created_by', 'created_at',
                  'updated_at')

    def get_to_type(self, obj):
        return obj.type

    def get_to_name(self, obj):
        return obj.get_object().name

    def get_created_by(self, obj):
        return RelatedUserSerializer(instance=obj.created_by).data


class InvitationSerializer(serializers.ModelSerializer):

    roles = serializers.SerializerMethodField('get_roles')
    created_by = RelatedUserSerializer(read_only=True)

    class Meta(MemberSerializer.Meta):
        fields = ('id', 'status', 'invitation_email', 'invitation_hash',
                  'roles', 'created_by', 'created_at', 'updated_at')

    def get_roles(self, obj):
        data = []
        for role in obj.role_set.all():
            data.append(InvitationRoleSerializer(instance=role).data)
        return data


class WorkspaceMembershipSerializer(RelatedMemberSerializer):

    class Meta(RelatedMemberSerializer.Meta):
        fields = ('status', 'id', 'workspace_key')


class WorkspaceSerializer(serializers.ModelSerializer):

    slug = serializers.SlugField(read_only=True)
    created_by = RelatedUserSerializer(read_only=True)
    perms = PermsField()
    membership = serializers.SerializerMethodField('get_membership')

    class Meta:
        model = Workspace
        fields = ('id', 'slug', 'name', 'description', 'membership',
                  'perms', 'created_at', 'updated_at', 'created_by')

    def get_membership(self, obj):
        member = Member.objects.\
            get_concrete_member_to_workspace(obj, self.user)
        if member:
            return WorkspaceMembershipSerializer(member).data
        else:
            return None


class RelatedWorkspaceSerializer(WorkspaceSerializer):

    class Meta(WorkspaceSerializer.Meta):
        fields = ['id', 'slug', 'name']


class WorkspaceKeySerializer(serializers.ModelSerializer):

    public_key = serializers.SerializerMethodField('get_public_key')
    status = serializers.IntegerField(read_only=True)
    workspace_key = serializers.CharField(required=True)
    workspace = RelatedWorkspaceSerializer(read_only=True)
    user = RelatedUserSerializer(read_only=True)

    class Meta:
        model = Member
        fields = ('id', 'public_key', 'workspace_key', 'status',
                  'workspace', 'user', 'created_at', 'updated_at')

    def get_public_key(self, obj):
        return obj.user.public_key

    def save_object(self, obj, **kwargs):
        obj.status = MemberStatusField.STATUS_MEMBER
        return super(WorkspaceKeySerializer, self).save_object(obj, **kwargs)


class ShortenedWorkspaceKeySerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = ('id', 'workspace', 'status', 'user', 'created_at',
                  'updated_at')
