from django.db.models.loading import get_model
from mptt import models as mpttmodels
from django.db import models
from django.conf import settings
from accounts.business.fields import MemberStatusField
from nodes.business.managers import NodeManager
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

    objects = NodeManager()

    def get_user_member(self, user):
        model = get_model("accounts.Member")
        return model.objects.get(user=user, node=self.get_root())

    def save(self, *args, **kwargs):
        self.acl_propagation_stopped = True

        super(Node, self).save(*args, **kwargs)

        if kwargs.get('force_insert') and not self.parent:
            self.acl_principal = get_model('accounts', 'Member')(
                node=self,
                user=self.created_by,
                status=MemberStatusField.STATUS_MEMBER,
                created_by=self.created_by
            )
            self.acl_principal.save()
        else:
            self.acl_principal = get_model('accounts', 'Member').objects.get(
                node=self.get_root(), user=self.created_by)

        self.acl.insert(created=kwargs.get('force_insert'))

    def delete(self, *args, **kwargs):
        self.acl_principal = get_model('accounts', 'Member').objects.get(
            node=self.get_root(), user=self.created_by)

        super(Node, self).delete(*args, **kwargs)


class Policy(PolicyModel):
    principal = models.ForeignKey("accounts.Member")
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
