from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.expressions import F
from django.db.models.manager import Manager
from django.db.models.query_utils import Q
from core.models.role_fields import RoleLevelField
from core.tools.changes import ChangesMixin


class CardManager(Manager):
    def all_acls(self, user):
        #todo: todo acl for secrets
        pass

class Secret(ChangesMixin, models.Model):
    type = models.IntegerField(null=False)
    data = models.TextField(null=True)
    card = models.ForeignKey('core.Card', on_delete=CASCADE)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = u'vaultier_secret'
        app_label = 'core'

