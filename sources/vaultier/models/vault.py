from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from django.db.models import F, Q
from django.db.models import signals
from django.db.models.query import QuerySet
from vaultier.models.fields import AclLevelField
from vaultier.tools.changes import ChangesMixin, post_change, SOFT_DELETE
from vaultier.tools.tree import TreeItemMixin
from django.utils.timezone import now

class SoftDeleteManagerMixin(object):
    def get_queryset(self):
        """
        Returns a new QuerySet object.  Subclasses can override this method
        to easily customize the behavior of the Manager.
        """
        return QuerySet(self.model, using=self._db).filter(deleted_at=None)

    def include_deleted(self):
          return QuerySet(self.model, using=self._db)

class SoftDeleteMixin(models.Model):
    class Meta:
        abstract = True

    deleted_at = models.DateTimeField(null=True)

    def softdelete(self, using=None):

        try:
            self.set_post_change_signal_enabled(False)
            self.deleted_at = now()
            self.save()
        finally:
            self.set_post_change_signal_enabled(True)

        if self._post_change_signal_disabled == 0:
            post_change.send(
                sender=self.__class__,
                instance=self,
                event_type=SOFT_DELETE,
                saved_values=self.saved_values()
            )


class VaultManager(SoftDeleteManagerMixin, Manager):
    def search(self, user, query, max_results=5):
        list = query.split()
        result = self.all_for_user(user).filter(
            Q(reduce(lambda x, y: x | y, [Q(name__icontains=word) for word in list])) |
            Q(reduce(lambda x, y: x | y, [Q(description__icontains=word) for word in list]))
        ).order_by('updated_at')

        return result[:max_results]

        #return self.all_for_user(user).filter(
        #    Q(name__icontains=query) |
        #    Q(description__icontains=query)
        #)

    def all_for_user(self, user):
        vaults = self.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        return vaults




class Vault(SoftDeleteMixin, ChangesMixin, models.Model, TreeItemMixin):
    class Meta:
        db_table = u'vaultier_vault'
        app_label = 'vaultier'

    def __unicode__(self):
        return 'Vault(' + str(self.id) + '):' + self.name

    objects = VaultManager()

    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='')
    description = models.CharField(max_length=1024, blank=True, null=True)
    workspace = models.ForeignKey('vaultier.Workspace', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_child_objects(self):
        return self.card_set.all()


    def get_parent_object(self):
        return self.workspace