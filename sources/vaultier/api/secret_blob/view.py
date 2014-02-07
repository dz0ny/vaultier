from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED, HTTP_200_OK
from rest_framework.viewsets import ModelViewSet
from vaultier.api.secret.view import SecretSerializer, CanManageSecretPermission
from vaultier.api.user.view import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import SecretBlob, Secret


class SecretBlobFieldSerializer(ModelSerializer):
    class Meta:
        model = SecretBlob
        fields = ('id', 'data', 'updated_at', 'created_at')


class SecretBlobSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(read_only=True)
    blob = SecretBlobFieldSerializer(required=True)

    def validate_blob(self, attrs, source):
        if not attrs.get('blob'):
            raise ValidationError('At least blob data must be specified')

        if len(attrs.get('blob').data) > 100000:
            raise ValidationError('Maximum blob size is 100K encrypted')

        return attrs

    class Meta:
        model = SecretBlob
        fields = ('id', 'blob', 'updated_at', 'created_at', 'created_by')


class SecretBlobViewSet(ModelViewSet):
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

    def pre_save(self, object):
        if object.blob and object.blob.pk is None:
            object.blob.created_by = self.request.user;
        return super(SecretBlobViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Secret.objects.all_for_user(self.request.user)
        else:
            queryset = Secret.objects.all()
        return queryset