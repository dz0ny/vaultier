from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, \
    ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import status

from accounts.business.authentication import TokenAuthentication
from accounts.business.fields import MemberStatusField
from accounts.models import Member
from vaultier.business.mixins import AtomicTransactionMixin
from workspaces.business.permissions import CanManageWorkspaceKey, \
    InvitationPermission
from workspaces.serializers import InvitationSerializer, \
    ShortenedWorkspaceKeySerializer, WorkspaceKeySerializer


class InvitationViewSet(AtomicTransactionMixin, UpdateModelMixin,
                        RetrieveModelMixin, GenericViewSet):

    model = Member
    serializer_class = InvitationSerializer
    authentication_classes = (TokenAuthentication, )  # todo: remove this
    permission_classes = (InvitationPermission,)
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
            return Member.objects.filter(
                user=self.request.user, status=MemberStatusField.STATUS_MEMBER)
