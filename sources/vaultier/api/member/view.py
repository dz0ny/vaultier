from rest_framework.fields import SerializerMethodField, EmailField, BooleanField, IntegerField
from rest_framework.filters import SearchFilter, DjangoFilterBackend, OrderingFilter
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.viewsets import ModelViewSet
from vaultier.api.transactionmixin import AtomicTransactionMixin
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.acl.fields import AclLevelField
from vaultier.models.member.fields import MemberStatusField
from vaultier.models.member.model import Member
from vaultier.models.workspace.model import Workspace
from vaultier.perms.check import has_object_acl


class CanManageMemberPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        workspace = obj.workspace
        result = has_object_acl(request.user, workspace, AclLevelField.LEVEL_READ)

        return result


class CanDeleteMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        workspace = obj.workspace
        is_manager = has_object_acl(request.user, workspace, AclLevelField.LEVEL_WRITE)

        result = is_manager
        return result


class MemberSerializer(ModelSerializer):
    email = SerializerMethodField('get_email')
    nickname = SerializerMethodField('get_nickname')
    roles_count = SerializerMethodField('get_roles_count')

    def get_email(self, obj):
        if obj:
            if (obj.user):
                return obj.user.email
            else:
                return obj.invitation_email

    def get_nickname(self, obj):
        if obj:
            if (obj.user):
                return obj.user.nickname
            else:
                return obj.invitation_email

    def get_roles_count(self, obj):
        from vaultier.models.role.model import Role
        return Role.objects.filter(member=obj).count()

    class Meta:
        model = Member
        fields = ('id', 'status', 'email', 'nickname', 'workspace', 'user', 'created_at', 'updated_at', 'roles_count')


class RelatedMemberSerializer(MemberSerializer):
    pass


class MemberInviteSerializer(Serializer):
    email = EmailField(required=True)
    workspace = PrimaryKeyRelatedField(required=True, queryset=Workspace.objects.all())
    send = BooleanField(required=False, default=True)
    resend = BooleanField(required=False, default=True)


class MemberResendSerializer(Serializer):
    resend = BooleanField(required=False, default=True)


class MemberWorkspaceKeySerializer(ModelSerializer):
    public_key = SerializerMethodField('get_public_key')
    status = IntegerField(read_only=True)

    def validate_workspace_key(self, attrs, source):
        return attrs

    def get_public_key(self, obj):
        return obj.user.public_key

    def save_object(self, obj, **kwargs):
        obj.status = MemberStatusField.STATUS_MEMBER
        return super(MemberWorkspaceKeySerializer, self).save_object(obj, **kwargs)

    class Meta:
        model = Member
        fields = ('id', 'public_key', 'workspace_key', 'status')


class MemberViewSet(
    AtomicTransactionMixin,
    ModelViewSet):
    model = Member
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, CanManageMemberPermission)
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter )
    search_fields = ('invitation_email', 'user__email', 'user__nickname',)
    filter_fields = ('workspace', 'status')
    ordering = ('status')

    def invite(self, request, *args, **kwargs):
        serializer = MemberInviteSerializer(data=request.DATA)

        if serializer.is_valid():
            member = Member(
                invitation_email=serializer.object.get('email'),
                workspace=serializer.object.get('workspace'),
                created_by=request.user
            )

            self.check_object_permissions(request, member)

            member = Member.objects.invite(
                member,
                send=serializer.object.get('send'),
                resend=serializer.object.get('resend')
            )

            return Response(
                MemberSerializer(member).data,
                status=HTTP_200_OK,
            )

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def resend(self, request, *args, **kwargs):
        serializer = MemberResendSerializer(data=request.DATA)
        if serializer.is_valid():

            member = self.get_object(
                queryset=Member.objects.all_for_user(request.user)
                .filter(status=MemberStatusField.STATUS_INVITED))

            self.check_object_permissions(request, member)

            Member.objects.send_invitation(member)

            return Response(
                MemberSerializer(member).data,
                status=HTTP_200_OK,
            )
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
            self.permission_classes = self.permission_classes + (CanDeleteMember,)
            return super(MemberViewSet, self).destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return self.invite(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.resend(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Member.objects.all_for_user(self.request.user)
        return queryset

