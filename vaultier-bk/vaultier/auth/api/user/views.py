from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, CreateModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_any_permissions.permissions import AnyPermissions
from vaultier.auth.api.token.authentication import TokenAuthentication
from vaultier.auth.api.user.permissions import CanManageUserPermission, SuperUserPermission
from vaultier.auth.api.user.serializers import UserSerializer
from vaultier.auth.models.user.model import User
from vaultier.base.utils.rest.atomictransaction import AtomicTransactionMixin


class UserViewSet(AtomicTransactionMixin,
                  UpdateModelMixin,
                  RetrieveModelMixin,
                  CreateModelMixin,
                  ListModelMixin,
                  GenericViewSet):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [AnyPermissions]
    any_permission_classes = [SuperUserPermission, CanManageUserPermission]
    model = User

    def get_queryset(self):
        if self.action == 'list':
            queryset = self.model.objects.all_for_user(self.request.user)
        else:
            queryset = User.objects.all()
        return queryset