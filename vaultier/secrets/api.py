from rest_framework import status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from libs.version.context import VersionContextAwareApiViewMixin
from secrets.business.permissions import CanManageSecretPermission
from secrets.models import Secret
from secrets.serializers import SecretSerializer, SecretBlobSerializer
from vaultier.business.mixins import AtomicTransactionMixin, \
    SoftDeleteModelMixin


class SecretViewSet(AtomicTransactionMixin, SoftDeleteModelMixin,
                    VersionContextAwareApiViewMixin, ModelViewSet):
    """
    API endpoint that allows secrets to be viewed or edited.
    """
    model = Secret
    serializer_class = SecretSerializer
    permission_classes = (IsAuthenticated, CanManageSecretPermission)
    filter_fields = ('card',)

    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user
        return super(SecretViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Secret.objects.all_for_user(self.request.user)
        else:
            queryset = Secret.objects.all()
        return queryset


class SecretBlobViewSet(AtomicTransactionMixin,
                        VersionContextAwareApiViewMixin,
                        mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                        GenericViewSet):
    """
    API endpoint that allows secret blobs to be viewed or edited.
    """
    model = Secret
    serializer_class = SecretBlobSerializer
    permission_classes = (IsAuthenticated, CanManageSecretPermission)

    def update(self, request, *args, **kwargs):
        response = super(SecretBlobViewSet, self).\
            update(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            response.data = {'detail': 'success'}
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super(SecretBlobViewSet, self).\
            partial_update(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            response.data = {'detail': 'success'}
        return response

    def get_queryset(self):
        if self.action == 'list':
            queryset = Secret.objects.all_for_user(self.request.user)
        else:
            queryset = Secret.objects.all()
        return queryset
