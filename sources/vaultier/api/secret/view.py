from rest_framework.fields import CharField
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from vaultier.api.permsfield import PermsField
from vaultier.api.softdeletemixin import SoftDeleteModelMixin
from vaultier.api.user.view import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Secret
from vaultier.models.acl.fields import AclLevelField
from vaultier.perms.check import has_object_acl


class CanManageSecretPermission(BasePermission):
    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list':

            result = has_object_acl(request.user, obj.card, AclLevelField.LEVEL_READ)

            return result
        else:
            result = True

            # check permission to card
            result = result and has_object_acl(request.user, obj.card, AclLevelField.LEVEL_WRITE)

            return result


class SecretPermsField(PermsField):
    def get_acls(self, obj, user):
        return obj.card.acl_set.filter(
            user=user
        )


class SecretSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(read_only=True)
    perms = SecretPermsField()
    blob_meta = CharField(read_only=True)

    def restore_fields(self, data, files):
        if (self.context.get('view').action == 'update' or self.context.get('view').action == 'partial_update' ):
            self.fields.get('type').read_only=True
        return super(SecretSerializer, self).restore_fields(data, files)


    class Meta:
        model = Secret
        fields = ('id', 'type', 'name', 'data', 'blob_meta', 'card', 'perms', 'created_at', 'updated_at', 'created_by')


class SecretViewSet(SoftDeleteModelMixin, ModelViewSet):
    """
    API endpoint that allows secrets to be viewed or edited.
    """
    model = Secret
    serializer_class = SecretSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageSecretPermission)
    filter_fields = ('card',)


    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user;
        return super(SecretViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Secret.objects.all_for_user(self.request.user)
        else:
            queryset = Secret.objects.all()
        return queryset


