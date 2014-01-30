from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from vaultier.api.fields.perms import PermsField
from vaultier.api.user import RelatedUserSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Secret
from vaultier.models.fields import AclLevelField
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

    class Meta:
        model = Secret
        fields = ('id', 'type', 'name', 'data', 'card', 'perms', 'created_at', 'updated_at', 'created_by')


class SecretViewSet(ModelViewSet):
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


