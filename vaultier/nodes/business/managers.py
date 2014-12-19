from django.db.models.loading import get_model
from mptt.models import TreeManager


class NodeManager(TreeManager):

    def all_for_user(self, user):
        workspaces = self.filter(
            _policies__principal=user,
            _policies__mask=get_model('nodes', 'Policy').mask.read
        ).distinct()

        return workspaces
