from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin, CreateModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet
from vaultier.auth.api.user.permissions import CanManageUserPermission
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
    permission_classes = (CanManageUserPermission,)
    model = User
