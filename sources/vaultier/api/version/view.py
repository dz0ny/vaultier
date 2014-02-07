from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED
from rest_framework.viewsets import ModelViewSet
from vaultier.api.version.serializers import VersionSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.version.model import Version


class VersionViewSet(ModelViewSet):
    """
    API endpoint that allows versions to be viewed or edited.
    """
    model = Version
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = VersionSerializer

    def destroy(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED,
                        data={'detail': 'Method \'DELETE\' not allowed.'})

    def create(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED,
                        data={'detail': 'Method \'POST\' not allowed.'})
