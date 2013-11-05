from rest_framework.fields import IntegerField
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.viewsets import ModelViewSet
from core.api.user import RelatedUserSerializer
from core.auth import TokenAuthentication
from core.models import Vault
from core.models.role import Role
from core.models.role_fields import RoleLevelField

class CanManageVaultPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        #update/delete action
        if obj.pk:
            return Role.objects.has_role_to_object(obj, request.user, RoleLevelField.LEVEL_WRITE )
        #create action
        else:
           return Role.objects.has_role_to_object(obj.workspace, request.user, RoleLevelField.LEVEL_WRITE )

class VaultSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False)

    class Meta:
        model = Vault
        fields = ('id', 'name', 'description','workspace', 'created_at', 'updated_at', 'created_by')


class VaultViewSet(ModelViewSet):
    """
    API endpoint that allows vaults to be viewed or edited.
    """
    model = Vault
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageVaultPermission)
    serializer_class = VaultSerializer

    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user;
        return super(VaultViewSet, self).pre_save(object)

    def get_queryset(self):
        queryset = Vault.objects.all_acls(self.request.user)
        return queryset