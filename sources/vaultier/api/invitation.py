from rest_framework.fields import SerializerMethodField
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED, HTTP_200_OK
from rest_framework.viewsets import ModelViewSet
from vaultier.api.member import MemberSerializer
from vaultier.api.user import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.fields import MemberStatusField
from vaultier.models.member import Member
from vaultier.models.role import Role

class InvitationRoleSerializer(ModelSerializer):
    created_by = SerializerMethodField('get_created_by')
    to_type = SerializerMethodField('get_to_type')
    to_name = SerializerMethodField('get_to_name')

    def get_to_type(self, obj):
        return obj.type

    def get_to_name(self, obj):
        return obj.get_object().name

    def get_created_by(self, obj):
        return RelatedUserSerializer(instance=obj.created_by).data


    class Meta:
        model = Role
        fields = ('id', 'to_type', 'to_name', 'created_by', 'created_at', 'updated_at')

class InvitationSerializer(ModelSerializer):
    roles = SerializerMethodField('get_roles')
    created_by = RelatedUserSerializer(read_only=True)

    def get_roles(self, obj):
        data = []
        for role in obj.role_set.all():
            data.append(InvitationRoleSerializer(instance=role).data)
        return data

    class Meta(MemberSerializer.Meta):
        fields = ('id', 'status','invitation_email', 'invitation_hash', 'roles', 'created_by', 'created_at', 'updated_at')


class InvitationViewSet(ModelViewSet):
    model = Member
    serializer_class = InvitationSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    lookup_field = 'invitation_hash'

    def list(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'List not provided'})

    def destroy(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Destroy not provided'})

    def create(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Create not provided'})

    def partial_update(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Partial update not provided'})

    def update(self, request, *args, **kwargs):
        member = self.get_object();
        Member.objects.accept_invitation(member, request.user)
        return Response(status=HTTP_200_OK, data=InvitationSerializer(instance=member).data)

    def get_queryset(self):
        return Member.objects.filter(status=MemberStatusField.STATUS_INVITED)
