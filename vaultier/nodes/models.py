from django.db.models.loading import get_model
from mptt import models as mpttmodels
from django.db import models
from django.conf import settings
from accounts.business.fields import MemberStatusField
from nodes.roles import ManageRole
from vaultier.business.db import TimestampableMixin
from django_mptt_acl.models import PolicyModel, ReadRole, CreateRole, WriteRole


class Node(mpttmodels.MPTTModel, TimestampableMixin):
    """
    Node model
    """

    ENC_VERSION = 1

    name = models.CharField(max_length=255)
    meta = models.TextField(null=True, blank=True)
    type = models.IntegerField()
    data = models.TextField(null=True, blank=True)
    blob_data = models.FileField(
        upload_to='', null=True, blank=True)
    color = models.CharField(max_length=7, blank=True, null=True)
    parent = mpttmodels.TreeForeignKey(
        'self', null=True, blank=True, related_name='children')
    enc_version = models.IntegerField(default=ENC_VERSION)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="nodes")

    def get_user_member(self, user):
        model = get_model("accounts.Member")
        return model.objects.get(user=user, node=self.get_root())

    def save(self, *args, **kwargs):
        super(Node, self).save(*args, **kwargs)
        if kwargs.get('force_insert') and not self.parent:
            m = get_model('accounts', 'Member')(
                node=self,
                user=self.created_by,
                status=MemberStatusField.STATUS_MEMBER_WITHOUT_WORKSPACE_KEY,
                created_by=self.created_by
            )
            m.save()


class Policy(PolicyModel):
    principal = models.ForeignKey(settings.AUTH_USER_MODEL)
    subject = models.ForeignKey(Node, related_name="_policies")

    def get_user_member(self, user):
        model = get_model("accounts.Member")
        return model.objects.get(user=user, node=self.subject.get_root())

    class PolicyMeta:
        subject_owner_field = 'created_by'
        roles = {
            'manage': ManageRole,
            'read': ReadRole,
            'create': CreateRole,
            'write': WriteRole
        }