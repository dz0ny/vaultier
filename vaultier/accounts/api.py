from django.contrib.auth import authenticate, logout
from django.db.transaction import atomic
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, DjangoFilterBackend, \
    OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from accounts.business.authentication import TokenAuthentication, \
    HashAuthentication
from accounts.business.fields import MemberStatusField
from accounts.business.permissions import CanManageUserPermission, \
    LostKeyPermission
from accounts.models import Token, User, LostKey, Member
from accounts.serializers import AuthSerializer, TokenSerializer, \
    UserSerializer, UserKeySerializer, LostKeySerializer, \
    LostKeyCreateSerializer, MemberInviteSerializer, MemberResendSerializer, \
    MemberSerializer
from vaultier.business.exceptions import CustomAPIException
from rest_framework import status
from rest_framework import mixins, viewsets
from vaultier.business.mixins import AtomicTransactionMixin
from workspaces.business.permissions import CanManageMemberPermission


class AuthView(APIView):
    @atomic
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                token = authenticate(
                    email=serializer.data.get('email'),
                    timestamp=serializer.data.get('timestamp'),
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


class LogoutView(APIView):

    authentication_classes = (TokenAuthentication,)

    def logout(self, request):
        try:
            logout(request)
            response = Response({'result': True})
            response.delete_cookie('sessionid', '/', '.')
            Token.objects.filter(token=request.auth).delete()
            return response
        except Exception as e:
            raise CustomAPIException(exception=e)

    @atomic
    def post(self, request):
        return self.logout(request)


class UserViewSet(AtomicTransactionMixin, ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (CanManageUserPermission,)
    model = User

    @action(methods=['GET', 'PUT'])
    def key(self, request, pk=None):
        if self.request.method == 'GET':
            serializer = UserKeySerializer(instance=self.get_object())
            return Response(status=status.HTTP_200_OK, data=serializer.data)

        if self.request.method == 'PUT':
            object = self.get_object()
            serializer = UserKeySerializer(instance=object, data=request.DATA)
            if serializer.is_valid():
                serializer.save_object(object)
                return Response(status=status.HTTP_200_OK,
                                data=serializer.data)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST,
                                data=serializer.errors)

        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED,
                        data={'Detail': 'Method not allowed'})


class LostKeyViewSet(AtomicTransactionMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.CreateModelMixin, viewsets.GenericViewSet):
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