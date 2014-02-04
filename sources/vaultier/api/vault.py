from rest_framework.fields import SlugField
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from vaultier.api.fields.perms import PermsField
from vaultier.api.shared.slug import RetrieveBySlugMixin
from vaultier.api.user import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Vault
from vaultier.models.fields import AclLevelField
from vaultier.models.history import History
from vaultier.perms.check import has_object_acl
from django.db import transaction
import reversion


class CanManageVaultPermission(BasePermission):
    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list':
            result = has_object_acl(request.user, obj, AclLevelField.LEVEL_READ)

            return result

        if view.action == 'destroy':
            result = True
            result = result and has_object_acl(request.user, obj, AclLevelField.LEVEL_WRITE)
            return result

        if view.action == 'create':
            result = True

            # check permission to workspace
            result = result and (
            has_object_acl(request.user, obj.workspace, AclLevelField.LEVEL_WRITE) or has_object_acl(request.user,
                                                                                                     obj.workspace,
                                                                                                     AclLevelField.LEVEL_CREATE))

            return result

        if view.action == 'update' or view.action == 'partial_update':
            result = True
            # check permission to vault
            result = result and has_object_acl(request.user, obj, AclLevelField.LEVEL_WRITE)
            # check permission to workspace
            result = result and has_object_acl(request.user, obj.workspace, AclLevelField.LEVEL_WRITE)
            return result

        return False


class VaultSerializer(ModelSerializer):
    slug = SlugField(read_only=True)
    created_by = RelatedUserSerializer(read_only=True)
    perms = PermsField()

    def restore_fields(self, data, files):
        if (self.context.get('view').action != 'create'):
            self.fields.get('workspace').read_only = True
        return super(VaultSerializer, self).restore_fields(data, files)

    class Meta:
        model = Vault
        fields = ('id', 'slug', 'name', 'description', 'workspace', 'perms', 'created_at', 'updated_at', 'created_by')


class RelatedVaultSerializer(VaultSerializer):
    class Meta(VaultSerializer.Meta):
        fields = ['id', 'slug', 'name']


class VaultViewSet(RetrieveBySlugMixin, ModelViewSet):
    """
    API endpoint that allows vaults to be viewed or edited.
    """
    model = Vault
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageVaultPermission)
    serializer_class = VaultSerializer
    filter_fields = ('workspace',)

    @transaction.atomic()
    @reversion.create_revision()
    def update(self, request, *args, **kwargs):
        return super(VaultViewSet, self).update(request, *args, **kwargs);

    @transaction.atomic()
    @reversion.create_revision()
    def destroy(self, request, *args, **kwargs):
        result = super(VaultViewSet, self).destroy(request, *args, **kwargs);
        reversion.add_meta(History,
                           parent_object_id=1,
                           parent_object_type=1,
                           action_type=1
        );
        return result

    @transaction.atomic()
    @reversion.create_revision()
    def create(self, request, *args, **kwargs):
        result = super(VaultViewSet, self).create(request, *args, **kwargs);
        reversion.add_meta(History,
                           parent_object_id=self.object.workspace.id,
                           parent_object_type=1,
                           action_type=1
        );
        return result


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