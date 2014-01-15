from rest_framework.fields import SerializerMethodField, IntegerField, CharField
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_200_OK, HTTP_405_METHOD_NOT_ALLOWED
from rest_framework.viewsets import ModelViewSet
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.acl_fields import AclLevelField
from vaultier.models.member import Member
from vaultier.models.member_fields import MemberStatusField
from vaultier.perms.check import has_object_acl

class CanManageWorkspaceKey(BasePermission):
    def has_object_permission(self, request, view, obj):
        workspace = obj.workspace
        is_manager = has_object_acl(request.user, workspace, AclLevelField.LEVEL_WRITE)
        is_managing_approved = Member.objects.get(user=request.user, workspace=workspace).status==MemberStatusField.STATUS_MEMBER
        is_managed_non_approved = Member.objects.get(user=obj.user, workspace=workspace).status==MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY

        result = is_manager or (is_managing_approved and  is_managed_non_approved)
        return result

class WorkspaceKeySerializer(ModelSerializer):
    public_key = SerializerMethodField('get_public_key')
    status = IntegerField(read_only=True)
    workspace_key = CharField(required=True, blank=False)

    def get_public_key(self, obj):
        return obj.user.public_key

    def save_object(self, obj, **kwargs):
        obj.status = MemberStatusField.STATUS_MEMBER
        return super(WorkspaceKeySerializer, self).save_object(obj, **kwargs)

    class Meta:
        model = Member
        fields = ('id', 'public_key', 'workspace_key', 'status')

class WorkspaceKeyViewSet(ModelViewSet):
    model = Member
    serializer_class = WorkspaceKeySerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, CanManageWorkspaceKey)

    def list(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'List not provided'})

    def destroy(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Destroy not provided'})

    def create(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Create not provided'})

    def partial_update(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Partial update not provided'})

