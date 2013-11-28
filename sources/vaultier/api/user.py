from rest_framework.fields import EmailField
from rest_framework.permissions import BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import User


class CanManageUserPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        if request.user and request.user.is_authenticated():
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.id == obj.id


class UserSerializer(ModelSerializer):
    email = EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']


class RelatedUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'nickname', 'email']


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (CanManageUserPermission,)
    model = User
