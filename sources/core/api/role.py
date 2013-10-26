from rest_framework.fields import CharField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from core.api.fields.relations import RelatedNestedField
from core.api.member import RelatedMemberSerializer
from core.api.user import RelatedUserSerializer
from core.auth import TokenAuthentication
from core.models.member import Member
from core.models.role import Role

class RoleSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False, read_only=True)
    member = RelatedNestedField(required=True, serializer=RelatedMemberSerializer, queryset=Member.objects.all())
    to_workspace = PrimaryKeyRelatedField(required=False)

    def save_object(self, obj, **kwargs):
        self.object = obj.save()

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

class RoleUpdateSerializer(RoleSerializer):
    def get_fields(self):
        fields = super(RoleUpdateSerializer,self).get_fields();
        for field in fields:
            if not field == 'level':
                fields[field].read_only = True
        return fields

class RoleViewSet(ModelViewSet):
    model = Role
    authentication_classes = (TokenAuthentication,)
    filter_fields = ('to_workspace', 'to_vault', 'to_card', 'level',)
    serializer_class = RoleSerializer

    def get_serializer_class(self):
        if self.action == 'update':
            return RoleUpdateSerializer
        else:
            return super(RoleViewSet, self).get_serializer_class()

    def pre_save(self, object):
        if not object.pk:
            object.created_by = self.request.user;
        return super(RoleViewSet, self).pre_save(object)

    def get_queryset(self):
        queryset = Role.objects.all()
        return queryset

