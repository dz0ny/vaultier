from rest_framework import serializers
from accounts.models import Member
from accounts.serializers import RelatedUserSerializer, RelatedMemberSerializer
from acls.models import Role
from cards.serializers import RelatedCardSerializer
from vaultier.business.fields import RelatedNestedField
from vaults.serializers import RelatedVaultSerializer
from workspaces.serializers import RelatedWorkspaceSerializer


class RoleSerializer(serializers.ModelSerializer):
    created_by = RelatedNestedField(serializer=RelatedUserSerializer,
                                    required=False, read_only=True)
    member = RelatedNestedField(serializer=RelatedMemberSerializer,
                                required=True, queryset=Member.objects.all())
    to_workspace = serializers.PrimaryKeyRelatedField(
        required=False, read_only=False)
    to_vault = serializers.PrimaryKeyRelatedField(
        required=False, read_only=False)
    to_card = serializers.PrimaryKeyRelatedField(
        required=False, read_only=False)

    def validate(self, attrs):
        if not (attrs.get('to_workspace') or attrs.get('to_vault') or
                attrs.get('to_card')):
            msg = 'At least one of to_workspace, to_vault, ' \
                  'to_card has to be set'
            raise serializers.ValidationError(msg)

        return attrs

    def save_object(self, obj, **kwargs):
        try:
            obj.compute_type()
        except:
            msg = 'Role has to be related to_workspace or to_vault or to_card'
            raise serializers.NestedValidationError(msg)
        self.object = Role.objects.create_or_update_role(obj)

    class Meta:
        model = Role
        fields = ('id', 'level', 'member', 'to_workspace', 'to_vault',
                  'to_card', 'created_by', 'created_at', 'updated_at',)


class RoleUpdateSerializer(RoleSerializer):

    def validate(self, attrs):
        return attrs

    def get_fields(self):
        fields = super(RoleUpdateSerializer, self).get_fields()
        for field in fields:
            if not field == 'level':
                fields[field].read_only = True
        return fields


class MemberRolesSerializer(RoleSerializer):
    member = RelatedNestedField(required=True,
                                serializer=RelatedMemberSerializer,
                                queryset=Member.objects.all())
    to_workspace = RelatedNestedField(required=False, read_only=False,
                                      serializer=RelatedWorkspaceSerializer)
    to_vault = RelatedNestedField(required=False, read_only=False,
                                  serializer=RelatedVaultSerializer)
    to_card = RelatedNestedField(required=False, read_only=False,
                                 serializer=RelatedCardSerializer)
