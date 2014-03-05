from django.contrib.contenttypes.models import ContentType
from rest_framework.filters import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED
from rest_framework.viewsets import ModelViewSet
from vaultier.api.exceptions import CustomAPIException
from vaultier.api.version.perms import CanReadVersionedRelatedPermission, CanReadVersionPermission
from vaultier.api.version.serializers import VersionSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.version.model import Version


class VersionViewSet(ModelViewSet):
    """
    API endpoint that allows versions to be viewed or edited.
    """
    model = Version
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, )
    serializer_class = VersionSerializer

    filter_backends = (DjangoFilterBackend, )
    filter_fields = (
        'versioned_related_id',
        'versioned_related_type__model',
    )

    def get_versioned_related_or_404(self, request):
        model = self.request.QUERY_PARAMS.get('versioned_related_type__model')
        id = self.request.QUERY_PARAMS.get('versioned_related_id');
        try:
            ct = ContentType.objects.get(app_label='vaultier', model=model)
            obj = ct.get_object_for_this_type(pk=id)
            return obj
        except:
            raise CustomAPIException(
                status_code=404,
                detail=
                'Please provide valid versioned_related_type__model '
                'and versioned_related_id query param'
            )

    def list(self, request, *args, **kwargs):
        self.permission_classes = (IsAuthenticated,CanReadVersionedRelatedPermission,)

        related = self.get_versioned_related_or_404(request);
        self.check_object_permissions(request, related);
        return super(VersionViewSet, self).list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        self.permission_classes = (IsAuthenticated,CanReadVersionPermission,)

        return super(VersionViewSet, self).retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return Response(
            status=HTTP_405_METHOD_NOT_ALLOWED,
            data={'detail': 'Method \'DELETE\' not allowed.'}
        )

    def create(self, request, *args, **kwargs):
        return Response(
            status=HTTP_405_METHOD_NOT_ALLOWED,
            data={'detail': 'Method \'DELETE\' not allowed.'}
        )

    def update(self, request, *args, **kwargs):
        return Response(
            status=HTTP_405_METHOD_NOT_ALLOWED,
            data={'detail': 'Method \'DELETE\' not allowed.'}
        )


    def partial_update(self, request, *args, **kwargs):
        return Response(
            status=HTTP_405_METHOD_NOT_ALLOWED,
            data={'detail': 'Method \'DELETE\' not allowed.'}
        )
