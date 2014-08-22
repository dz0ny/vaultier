from rest_framework.filters import OrderingFilter, DjangoFilterBackend, \
    SearchFilter
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from accounts.business.authentication import TokenAuthentication
from libs.version.context import VersionContextAwareApiViewMixin
from vaultier.business.mixins import AtomicTransactionMixin, \
    RetrieveBySlugMixin, SoftDeleteModelMixin
from workspaces.business.fields import MemberStatusField
from workspaces.business.permissions import CanManageMemberPermission, \
    CanManageWorkspace, CanManageWorkspaceKey
from workspaces.models import Member, Workspace
from workspaces.serializers import InvitationSerializer, MemberSerializer, \
    MemberInviteSerializer, MemberResendSerializer, WorkspaceSerializer, \
    ShortenedWorkspaceKeySerializer, WorkspaceKeySerializer
from rest_framework import status


class InvitationViewSet(AtomicTransactionMixin, UpdateModelMixin,
                        RetrieveModelMixin, GenericViewSet):

    model = Member
    serializer_class = InvitationSerializer
    authentication_classes = (TokenAuthentication, ) # todo: remove this shit
    permission_classes = (IsAuthenticated,)
    lookup_field = 'invitation_hash'

    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED,
                        data={'detail': 'Method not allowed'})

    def update(self, request, *args, **kwargs):
        member = self.get_object()
        Member.objects.accept_invitation(member, request.user)
        return Response(status=status.HTTP_200_OK,
                        data=InvitationSerializer(instance=member).data)

    def get_queryset(self):
        return Member.objects.filter(status=MemberStatusField.STATUS_INVITED)


class MemberViewSet(AtomicTransactionMixin, ModelViewSet):
    model = Member
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, CanManageMemberPermission)
    filter_backends = (SearchFilter, DjangoFilterBackend, OrderingFilter,)
    search_fields = ('invitation_email', 'user__email', 'user__nickname',)
    filter_fields = ('workspace', 'status')
    ordering = ('status', )

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
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        return self.invite(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.resend(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Member.objects.all_for_user(self.request.user)
        return queryset


class WorkspaceViewSet(AtomicTransactionMixin, RetrieveBySlugMixin,
                       SoftDeleteModelMixin, VersionContextAwareApiViewMixin,
                       ModelViewSet):
    """
    API endpoint that allows workspaces to be viewed or edited.
    """
    model = Workspace
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageWorkspace)
    serializer_class = WorkspaceSerializer

    def get_serializer(self, *args, **kwargs):
        serializer = super(WorkspaceViewSet, self).\
            get_serializer(*args, **kwargs)
        serializer.user = self.request.user
        return serializer

    def pre_save(self, object):
        if object.pk is None:
            object._user = self.request.user
            object.created_by = self.request.user
        return super(WorkspaceViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Workspace.objects.all_for_user(self.request.user)
        else:
            queryset = Workspace.objects.all()
        return queryset


class WorkspaceKeyViewSet(AtomicTransactionMixin, ModelViewSet):
    model = Member
    permission_classes = (IsAuthenticated, CanManageWorkspaceKey)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Destroy not provided'})

    def create(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Create not provided'})

    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Partial update not provided'})

    def get_serializer_class(self):
        if self.action == 'list':
            return ShortenedWorkspaceKeySerializer
        else:
            return WorkspaceKeySerializer

    def get_queryset(self):
        if self.action == 'list':
            return Member.objects.all_to_transfer_keys(self.request.user)
        else:
            return Member.objects.all_for_user(self.request.user)