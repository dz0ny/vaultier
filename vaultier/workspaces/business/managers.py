from django.db.models.loading import get_model
from django.db.models.manager import Manager

from accounts.business.fields import MemberStatusField
from acls.business.fields import AclLevelField, RoleLevelField
from acls.models import Role
from libs.softdelete.softdelete import SoftDeleteManagerMixin


class WorkspaceManager(SoftDeleteManagerMixin, Manager):

    def all_for_user(self, user):
        workspaces = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return workspaces

    def create_member_with_workspace(self, workspace):
        attrs_needed = ['_user', ]
        if not all(hasattr(workspace, attr) for attr in attrs_needed):
            msg = '_user attribute is required to create related membership'
            raise AttributeError(msg)

        m = get_model('accounts', 'Member')(
            workspace=workspace,
            user=workspace._user,
            status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY,
            created_by=workspace._user
        )
        m.save()

        r = Role(
            member=m,
            to_workspace=workspace,
            created_by=workspace._user,
            level=RoleLevelField.LEVEL_WRITE
        )
        r.save()
