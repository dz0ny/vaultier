from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_401_UNAUTHORIZED, HTTP_402_PAYMENT_REQUIRED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet
from core.api.user import RelatedUserSerializer
from core.auth.authentication import TokenAuthentication
from core.models import Secret
from core.models.role_fields import RoleLevelField
from core.perms.check import has_object_acl


class CanManageSecretPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list' :

            result = has_object_acl(request.user, obj.card, RoleLevelField.LEVEL_READ)

            return result
        else:
            result = True

            # check permission to card
            result = result and has_object_acl(request.user, obj.card, RoleLevelField.LEVEL_WRITE)

            return result

class SecretSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False)

    class Meta:
        model = Secret
        fields = ('id', 'type', 'data' ,'card', 'created_at', 'updated_at', 'created_by')


class SecretViewSet(ModelViewSet):
    """
    API endpoint that allows secrets to be viewed or edited.
    """
    model = Secret
    # permission_classes = (IsAuthenticated,)
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
            queryset = Secret.objects.all_for_user (self.request.user)
        else:
            queryset = Secret.objects.all()
        return queryset
