from django.db import models
from django.db.models.query import QuerySet
from django.utils.timezone import now
from libs.changes.changes import post_change, SOFT_DELETE


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

    @classmethod
    def bulk_delete(cls, queryset):
        """
        Soft delete a query select
        :param queryset: QuerySet
        :return:
        """
        queryset.values('pk').update(deleted_at=now())

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
                overwritten_values=self.overwritten_values()
            )
