from rest_framework.mixins import CreateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from vaultier.auth.api.token.serializers import TokenSerializer
from vaultier.auth.models.token.model import Token
from vaultier.base.utils.rest.atomictransaction import AtomicTransactionMixin


class TokenViewSet(AtomicTransactionMixin,
                  CreateModelMixin,
                  DestroyModelMixin,
                  GenericViewSet):

    serializer_class = TokenSerializer
    model = Token

    def create(self, request):
        pass


    def destroy(self, request, pk=None):
        pass

