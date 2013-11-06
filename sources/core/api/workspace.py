from rest_framework.fields import SerializerMethodField
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from core.api.member import RelatedMemberSerializer
from core.api.user import RelatedUserSerializer
from core.auth import TokenAuthentication
from core.models import Workspace
from core.models.member import Member
from core.models.role import Role
from core.models.role_fields import RoleLevelField


class CanManageWorkspace(BasePermission):
    def has_object_permission(self, request, view, obj):
        #due to some bug in rest framework request is ModelViewSet
        request = view.request

        if view.action == 'retrieve' or view.action == 'list' :
            required_level = RoleLevelField.LEVEL_READ
        else:
            required_level = RoleLevelField.LEVEL_WRITE

        if not obj.pk:
            return True
        else:
            role = Role.objects.get_summarized_role_to_object(obj, request.user)
            result = (role and role.level >= required_level)
            return result

class WorkspaceMembershipSerializer(RelatedMemberSerializer):
    class Meta(RelatedMemberSerializer.Meta):
        fields = ('status', 'id')

class WorkspaceSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False)
    membership = SerializerMethodField('get_membership')

    def get_membership(self, obj):
        member = Member.objects.get_member_to_workspace(obj, self.user)
        if (member):
            return WorkspaceMembershipSerializer(member).data
        else:
            return None

    class Meta:
        model = Workspace
        fields = ('id', 'name', 'description', 'membership', 'created_at', 'updated_at', 'created_by')

class RelatedWorkspaceSerializer(WorkspaceSerializer):
    class Meta(WorkspaceSerializer.Meta):
        fields = ['id', 'name']


class WorkspaceViewSet(ModelViewSet):
    """
    API endpoint that allows workspaces to be viewed or edited.
    """
    model = Workspace
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageWorkspace)
    serializer_class = WorkspaceSerializer

    def get_serializer(self, *args, **kwargs):
        serializer = super(WorkspaceViewSet, self).get_serializer(*args, **kwargs)
        serializer.user = self.request.user
        return serializer

    def pre_save(self, object):
        if object.pk is None:
            object._user = self.request.user
            object.created_by = self.request.user;
        return super(WorkspaceViewSet, self).pre_save(object)

    def get_queryset(self):
        queryset = Workspace.objects.all_for_user(self.request.user)
        return queryset