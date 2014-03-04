from django.core.exceptions import ValidationError
from rest_framework.fields import FileField
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED, HTTP_200_OK
from rest_framework.viewsets import ModelViewSet
from modelext.version.context import VersionContextAwareApiViewMixin
from vaultier.api.secret.view import CanManageSecretPermission
from vaultier.api.user.view import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Secret


class BlobDataField(FileField):
    def to_native(self, value):
        return value.read()

    def from_native(self, data):
        max_size = 100 * 1000
        if not data:
            raise ValidationError('At least blob_data must be specified')

        if data and hasattr(data, 'size') and data.size > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        if data and not hasattr(data, 'size') and len(data) > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        return super(BlobDataField, self).from_native(data)


class SecretBlobSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(read_only=True)
    blob_data = BlobDataField()

    class Meta:
        model = Secret
        fields = ('id', 'blob_meta', 'blob_data')


class SecretBlobViewSet(
    VersionContextAwareApiViewMixin,
    ModelViewSet
):
    """
    API endpoint that allows secret blobs to be viewed or edited.
    """
    model = Secret
    serializer_class = SecretBlobSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageSecretPermission)

    def update(self, request, *args, **kwargs):
        response = super(SecretBlobViewSet, self).update(request, *args, **kwargs);
        if (response.status_code == HTTP_200_OK):
            response.data = {'detail': 'success'}
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super(SecretBlobViewSet, self).partial_update(request, *args, **kwargs);
        if (response.status_code == HTTP_200_OK):
            response.data = {'detail': 'success'}
        return response


    def list(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Method \'GET\' not allowed.'})

    def destroy(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Method \'DELETE\' not allowed.'})

    def create(self, request, *args, **kwargs):
        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'detail': 'Method \'POST\' not allowed.'})

    def get_queryset(self):
        if self.action == 'list':
            queryset = Secret.objects.all_for_user(self.request.user)
        else:
            queryset = Secret.objects.all()
        return queryset