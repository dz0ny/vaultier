from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from libs.version.context import VersionContextAwareApiViewMixin
from vaultier.business.mixins import SoftDeleteModelMixin, \
    RetrieveBySlugMixin, AtomicTransactionMixin
from vaults.business.permissions import CanManageVaultPermission
from vaults.models import Vault
from vaults.serializers import VaultSerializer


class VaultViewSet(AtomicTransactionMixin, RetrieveBySlugMixin,
                   SoftDeleteModelMixin, VersionContextAwareApiViewMixin,
                   ModelViewSet):
    """
    API endpoint that allows vaults to be viewed or edited.
    """
    model = Vault
    permission_classes = (IsAuthenticated, CanManageVaultPermission)
    serializer_class = VaultSerializer
    filter_fields = ('workspace',)

    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user
        return super(VaultViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Vault.objects.all_for_user(self.request.user)
        else:
            queryset = Vault.objects.all()
        return queryset
