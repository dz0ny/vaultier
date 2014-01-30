from rest_framework.fields import SerializerMethodField, IntegerField, CharField
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED
from rest_framework.viewsets import ModelViewSet
from vaultier.api.user import RelatedUserSerializer
from vaultier.api.workspace import RelatedWorkspaceSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.fields import MemberStatusField
from vaultier.models.member import Member


class CanManageWorkspaceKey(BasePermission):
    def has_object_permission(self, request, view, obj):
        return Member.objects.all_to_transfer_keys(request.user).filter(id=obj.id).count()>0


class WorkspaceKeySerializer(ModelSerializer):
    public_key = SerializerMethodField('get_public_key')
    status = IntegerField(read_only=True)
    workspace_key = CharField(required=True)
    workspace = RelatedWorkspaceSerializer(read_only=True)
    user = RelatedUserSerializer(read_only=True)

    def get_public_key(self, obj):
        return obj.user.public_key

    def save_object(self, obj, **kwargs):
        obj.status = MemberStatusField.STATUS_MEMBER
        return super(WorkspaceKeySerializer, self).save_object(obj, **kwargs)

    class Meta:
        model = Member
        fields = ('id', 'public_key', 'workspace_key', 'status', 'workspace', 'user', 'created_at', 'updated_at')

class ShortenedWorkspaceKeySerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = ('id','workspace', 'status', 'user', 'created_at', 'updated_at')


class WorkspaceKeyViewSet(ModelViewSet):
    model = Member
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, CanManageWorkspaceKey)

    def destroy(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Destroy not provided'})

    def create(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Create not provided'})

    def partial_update(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Partial update not provided'})

    def get_serializer_class(self):
        if (self.action == 'list'):
            return ShortenedWorkspaceKeySerializer
        else:
            return WorkspaceKeySerializer

    def get_queryset(self):
        if (self.action == 'list'):
            return Member.objects.all_to_transfer_keys(self.request.user)
        else:
            return Member.objects.all_for_user(self.request.user)
