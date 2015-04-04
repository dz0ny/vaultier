from django.db.transaction import atomic
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
    LostKeyPermission, CanManageMemberPermission
from accounts.models import User, LostKey, Member
from accounts.serializers import AuthSerializer, TokenSerializer, \
    UserSerializer, UserKeySerializer, LostKeySerializer, \
    LostKeyCreateSerializer, MemberInviteSerializer, MemberResendSerializer, \
    MemberSerializer
from vaultier.business.exceptions import CustomAPIException
from rest_framework import status
from rest_framework import mixins, viewsets
from vaultier.business.mixins import AtomicTransactionMixin
from .business.authentication import Authenticator



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']

    def get_fields(self):
        """
        Adds invitation_hash field in create action only if registration is
        disabled
        """
        request = self.context.get('request')
        ret = super(UserSerializer, self).get_fields()

        if not request:
            return ret

        if request.method == 'POST' and \
                bool(User.objects.all().count() is not 0) and \
                not settings.VAULTIER.get('registration_allow'):
            ret['invitation_hash'] = serializers.CharField(write_only=True,
                                                           required=True)
        return ret

    def validate_invitation_hash(self, attrs, source):
        """
        Validate invitation hash validity
        """
        hash = attrs[source]
        try:
            Member.objects.get(invitation_hash=hash)
        except Member.DoesNotExist:
            # first user can register
            if bool(User.objects.all().count()):
                # kick the rest
                raise serializers.ValidationError("Invitation not found")

        del attrs[source]
        return attrs

    def restore_fields(self, data, files):
        if self.context.get('view').action != 'create':
            self.fields.get('public_key').read_only = True
        return super(UserSerializer, self).restore_fields(data, files)


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

    def get_serializer_class(self):
        """
        Change serializer class to UserKeySerializer in list action
        """
        if self.action in ["list"]:
            return UserKeySerializer
        return super(UserViewSet, self).get_serializer_class()


