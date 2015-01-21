from rest_framework import serializers

from accounts.business.fields import MemberStatusField
from accounts.models import Member
from accounts.serializers import RelatedUserSerializer, MemberSerializer
from nodes.serializers import NodeSerializer


class InvitationSerializer(serializers.ModelSerializer):
    created_by = RelatedUserSerializer(read_only=True)

    class Meta(MemberSerializer.Meta):
        fields = ('id', 'status', 'invitation_email', 'invitation_hash',
                  'created_by', 'created_at', 'updated_at')


class WorkspaceKeySerializer(serializers.ModelSerializer):

    public_key = serializers.SerializerMethodField('get_public_key')
    status = serializers.IntegerField(read_only=True)
    workspace_key = serializers.CharField(required=True)
    user = RelatedUserSerializer(read_only=True)

    class Meta:
        model = Member
        fields = ('id', 'public_key', 'workspace_key', 'status',
                  'node', 'user', 'created_at', 'updated_at')

    def get_public_key(self, obj):
        return obj.user.public_key

    def get_fields(self):
        ret = super(WorkspaceKeySerializer, self).get_fields()
        ret.update({
            'node': NodeSerializer(read_only=True, context=self.context)
        })
        return ret

    def save_object(self, obj, **kwargs):
        obj.status = MemberStatusField.STATUS_MEMBER
        return super(WorkspaceKeySerializer, self).save_object(obj, **kwargs)


class ShortenedWorkspaceKeySerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = ('id', 'node', 'status', 'user', 'created_at',
                  'updated_at')
