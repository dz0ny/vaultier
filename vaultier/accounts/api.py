from django.db.transaction import atomic
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.filters import SearchFilter, DjangoFilterBackend, \
    OrderingFilter
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, \
    CreateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from accounts.business.authentication import TokenAuthentication, \
    HashAuthentication
from accounts.business.fields import MemberStatusField
from accounts.business.permissions import CanManageUserPermission, \
    LostKeyPermission
from accounts.models import User, LostKey, Member
from accounts.serializers import AuthSerializer, TokenSerializer, \
    UserSerializer, UserKeySerializer, LostKeySerializer, \
    LostKeyCreateSerializer, MemberInviteSerializer, MemberResendSerializer, \
    MemberSerializer
from vaultier.business.exceptions import CustomAPIException
from rest_framework import status
from rest_framework import mixins, viewsets
from vaultier.business.mixins import AtomicTransactionMixin
from workspaces.business.permissions import CanManageMemberPermission
from .business.authentication import Authenticator
from django.conf import settings


class AuthView(APIView):

    @atomic
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                token = Authenticator.authenticate(
                    email=serializer.data.get('email'),
                    date=serializer.data.get('date'),
                    signature=serializer.data.get('signature')
                )

                if token:
                    return Response(TokenSerializer(token).data)
                else:
                    return Response({'result': False},
                                    status=status.HTTP_403_FORBIDDEN)
            except Exception as e:
                raise CustomAPIException(exception=e)

        raise CustomAPIException(detail=serializer.errors)

    def post(self, request):
        return self.auth(request)


class UserViewSet(AtomicTransactionMixin,
                  UpdateModelMixin,
                  RetrieveModelMixin,
                  CreateModelMixin,
                  ListModelMixin,
                  GenericViewSet):
    """
    User resource endpoint
    """
    serializer_class = UserSerializer
    permission_classes = (CanManageUserPermission,)
    model = User

    def create(self, request, *args, **kwargs):
        """
        Check if is registration allowed or if is any registered user in here.
        Otherwise raise 405 exception
        """
        if settings.VAULTIER.get('registration_allow') or not \
                bool(User.objects.all().count()):
            return super(UserViewSet, self).create(request, *args, **kwargs)
        raise MethodNotAllowed(method='POST')

    def get_serializer_class(self):
        """
        Change serializer class to UserKeySerializer in list action
        """
        if self.action in ["list"]:
            return UserKeySerializer
        return super(UserViewSet, self).get_serializer_class()


class LostKeyViewSet(AtomicTransactionMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    """
    LostKey view points
    """
    model = LostKey
    serializer_class = LostKeySerializer
    permission_classes = (LostKeyPermission,)
    authentication_classes = (HashAuthentication,)

    def get_serializer_class(self):
        """
        Dynamically retrieve serializer based on request view
        :return: Serializer
        """
        if self.action == 'create':
            return LostKeyCreateSerializer
        else:
            return LostKeySerializer


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
