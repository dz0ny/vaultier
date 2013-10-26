from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
import hmac
import uuid
from web.session import sha1


class MemberManager(Manager):
    def generateInvitationHash(self):
        #todo: ensure invitation hash is unique
        unique = uuid.uuid4()
        return hmac.new(unique.bytes, digestmod=sha1).hexdigest()

    def invite(self, user=None, workspace=None, email=None, send=True, resend=True):
        try:
            member = Member.objects.get(invitation_email=email, workspace=workspace)
            if send:
                pass
                # send invitation here

        except Member.DoesNotExist:
            member = Member()
            member.workspace = workspace
            member.user = None
            member.invitation_email = email
            member.status = u'i'
            member.created_by = user
            member.save()
            if resend:
                pass
                # send invitation here
        return member


class Member(models.Model):
    objects = MemberManager()

    class Meta:
        db_table = u'vaultier_member'
        app_label = 'core'

    workspace = models.ForeignKey('core.Workspace', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE, null=True)
    invitation_hash = models.CharField(max_length=64, null=True, unique=True)
    invitation_email = models.CharField(max_length=1024, null=True)
    status = models.CharField(
        max_length=1,
        default='m',
        choices=(
            (u'i', u'INVITED'),
            (u'a', u'NON_APPROVED_MEMBER'),
            (u'm', u'MEMBER'),
        ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='members_created')

    def save(self, *args, **kwargs):
        if not self.invitation_hash:
            self.invitation_hash = Member.objects.generateInvitationHash()
        return super(Member, self).save(*args, **kwargs)


