from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.signals import post_save
from core.models.role import Role
from core.models.workspace import Workspace

class Member(models.Model):
    workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE, null=True)
    invitation_hash = models.CharField(max_length=64, null=True)
    invitation_email = models.CharField(max_length=1024, null=True),
    status = models.CharField(
        max_length=1,
        default='u',
        choices=(
            (u'i', u'INVITED'),
            (u'u', u'USER'),
        ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='members_created')

    class Meta:
        db_table = u'vaultier_member'
        app_label = 'core'

def create_member_with_workspace(sender, instance, created, **kwargs):
    if created:
        attrs_needed = ['_user',]
        if all(hasattr(instance, attr) for attr in attrs_needed):
            m = Member(
                workspace=instance,
                user=instance._user,
                status='u',
                created_by=instance._user
            )
            m.save()

            r = Role(
                member=m,
                to_workspace=instance,
                created_by=instance._user,
                level='a'
            )
            r.save()

        else:
            raise AttributeError('_user attribute is required to create related membership')

post_save.connect(create_member_with_workspace, sender=Workspace)

