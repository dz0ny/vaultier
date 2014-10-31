from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, \
    ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import status

from accounts.business.authentication import TokenAuthentication
from accounts.business.fields import MemberStatusField
from accounts.models import Member
from libs.version.context import VersionContextAwareApiViewMixin
from vaultier.business.mixins import AtomicTransactionMixin, \
    RetrieveBySlugMixin, SoftDeleteModelMixin
from workspaces.business.permissions import CanManageWorkspace, \
    CanManageWorkspaceKey
from workspaces.models import Workspace
from workspaces.serializers import InvitationSerializer, WorkspaceSerializer, \
    ShortenedWorkspaceKeySerializer, WorkspaceKeySerializer


class InvitationViewSet(AtomicTransactionMixin, UpdateModelMixin,
                        RetrieveModelMixin, GenericViewSet):

    model = Member
    serializer_class = InvitationSerializer
    authentication_classes = (TokenAuthentication, )  # todo: remove this
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


class WorkspaceKeyViewSet(AtomicTransactionMixin,
                          RetrieveModelMixin,
                          ListModelMixin,
                          UpdateModelMixin,
                          GenericViewSet):
    model = Member
    permission_classes = (IsAuthenticated, CanManageWorkspaceKey)

    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED,
                        data={'detail': 'Partial update not provided'})

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
