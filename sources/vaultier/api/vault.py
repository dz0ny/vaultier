from rest_framework.fields import SlugField
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from vaultier.api.fields.perms import PermsField
from vaultier.api.shared.slug import RetrieveBySlugMixin
from vaultier.api.user import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Vault
from vaultier.models.role_fields import RoleLevelField
from vaultier.perms.check import has_object_acl


class CanManageVaultPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list' :

            result = has_object_acl(request.user, obj, RoleLevelField.LEVEL_READ)

            return result
        else:
            result = True

            # check permission to vault
            result = result and has_object_acl(request.user, obj, RoleLevelField.LEVEL_WRITE)

            # check permission to workspace
            result = result and has_object_acl(request.user, obj.workspace, RoleLevelField.LEVEL_WRITE)

            return result


class VaultSerializer(ModelSerializer):
    slug = SlugField(read_only=True)
    created_by = RelatedUserSerializer(required=False)
    perms = PermsField()

    class Meta:
        model = Vault
        fields = ('id', 'slug', 'name', 'description','workspace', 'perms', 'created_at', 'updated_at', 'created_by')

class RelatedVaultSerializer(VaultSerializer):
    class Meta(VaultSerializer.Meta):
        fields = ['id', 'slug','name']



class VaultViewSet(RetrieveBySlugMixin, ModelViewSet):
    """
    API endpoint that allows vaults to be viewed or edited.
    """
    model = Vault
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageVaultPermission)
    serializer_class = VaultSerializer
    filter_fields = ('workspace',)

    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user;
        return super(VaultViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Vault.objects.all_for_user(self.request.user)
        else:
            queryset = Vault.objects.all()
        return queryset