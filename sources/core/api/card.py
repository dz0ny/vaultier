from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from core.api.user import RelatedUserSerializer
from core.auth.authentication import TokenAuthentication
from core.models import Card
from core.models.role_fields import RoleLevelField
from core.perms.check import has_object_acl


class CanManageCardPermission(BasePermission):

    def has_object_permission(self, request, view, obj):

        if view.action == 'retrieve' or view.action == 'list' :

            result = has_object_acl(request.user, obj, RoleLevelField.LEVEL_READ)

            return result
        else:
            result = True

            # check permission to card
            result = result and has_object_acl(request.user, obj, RoleLevelField.LEVEL_WRITE)

            # check permission to vault
            result = result and has_object_acl(request.user, obj.vault, RoleLevelField.LEVEL_WRITE)

            return result


class CardSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False)

    class Meta:
        model = Card
        fields = ('id', 'name', 'description','vault', 'created_at', 'updated_at', 'created_by')


class CardViewSet(ModelViewSet):
    """
    API endpoint that allows cars to be viewed or edited.
    """
    model = Card
    serializer_class = CardSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, CanManageCardPermission)
    filter_fields = ('vault',)

    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user;
        return super(CardViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Card.objects.all_for_user(self.request.user)
        else:
            queryset = Card.objects.all()
        return queryset
    
