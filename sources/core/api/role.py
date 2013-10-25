from rest_framework.fields import CharField
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from core.api.member import MemberSerializer
from core.api.user import RelatedUserSerializer
from core.api.workspace import RelatedWorkspaceSerializer
from core.auth import TokenAuthentication
from core.models.role import Role

class RoleSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False)
    to_workspace = RelatedWorkspaceSerializer(required=False)
    member = MemberSerializer(required=True)

    def get_email(self, obj):
        if obj:
            if (obj.status == 'i'):
                return obj.invitation_email
            else:
                return obj.user.email

    def get_nickname(self, obj):
        if obj:
            if (obj.status == 'i'):
                return obj.invitation_email
            else:
                return obj.user.nickname

    class Meta:
        model = Role
        fields = ('id', 'level', 'member', 'to_workspace', 'created_by', 'created_at', 'updated_at',)


class RoleViewSet(ModelViewSet):
    model = Role
    serializer_class = RoleSerializer
    authentication_classes = (TokenAuthentication,)
    filter_fields = ('to_workspace', 'level',)

    def pre_save(self, object):
        if object.pk is None:
            object.created_by = self.request.user;
        return super(RoleViewSet, self).pre_save(object)

    def get_queryset(self):
        queryset = Role.objects.all()
        return queryset

