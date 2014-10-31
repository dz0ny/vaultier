from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from acls.business.permissions import CanManageRolePermission
from acls.models import Role
from acls.serializers import RoleSerializer, RoleUpdateSerializer, \
    MemberRolesSerializer
from vaultier.business.mixins import AtomicTransactionMixin


class RoleViewSet(AtomicTransactionMixin, ModelViewSet):
    model = Role
    permission_classes = (IsAuthenticated, CanManageRolePermission)
    filter_fields = ('to_workspace', 'to_vault', 'to_card', 'level',)
    serializer_class = RoleSerializer

    def get_serializer_class(self):
        if self.action == 'update' or self.action == 'partial_update':
            return RoleUpdateSerializer
        elif self.action == 'list' and \
                self.request.QUERY_PARAMS.get('to_member', None):
            return MemberRolesSerializer
        else:
            return super(RoleViewSet, self).get_serializer_class()

    def pre_save(self, object):
        self.check_object_permissions(self.request, object)
        if not object.pk:
            object.created_by = self.request.user
        return super(RoleViewSet, self).pre_save(object)

    def get_queryset(self):
        member_id = self.request.QUERY_PARAMS.get('to_member')
        if member_id:
            queryset = Role.objects.all_for_member(member_id)
        else:
            queryset = Role.objects.all_for_user(self.request.user)
        return queryset
