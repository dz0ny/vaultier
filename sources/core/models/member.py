from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
import hmac
import uuid
from web.session import sha1

class MemberStatusField(models.IntegerField):

    STATUS_INVITED = 100
    STATUS_NON_APPROVED_MEMBER = 200
    STATUS_MEMBER = 300

    STATUS_CHOICES = (
            (STATUS_INVITED, 'INVITED'),
            (STATUS_NON_APPROVED_MEMBER, 'NON_APPROVED_MEMBER'),
            (STATUS_MEMBER, 'MEMBER'),
        )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.STATUS_CHOICES
        kwargs['default'] = 3
        super(MemberStatusField, self).__init__(*args, **kwargs)


class MemberManager(Manager):

    def generate_invitation_hash(self):
        #todo: ensure invitation hash is unique
        unique = uuid.uuid4()
        return hmac.new(unique.bytes, digestmod=sha1).hexdigest()

    def get_member_to_workspace(self, workspace, user):
        member = None
        try:
            member = self.filter(
                workspace=workspace,
                user=user,
                status__gt=0
            )[0]
        except:
            pass

        return member

    def join_member(self, source, target):
        for role in source.role_set.all():
            role.member = target
            role.save()

    def accept_invitation(self, member, user):
        workspace = member.workspace
        existing_member = self.get_member_to_workspace(workspace, user)

        # user membership does not exists, or it is only invite
        if not existing_member:
            member.user = user
            member.status = Member.STATUS_NON_APPROVED_MEMBER
            member.save()

        # membership exists, we need to joind current membership to existing
        # todo: this case is not tested
        else:
            self.join_member(member, existing_member)
            member.delete()
            member = existing_member

        # reload member
        member = Member.objects.get(id=member.id)

        return member


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

    workspace = models.ForeignKey('core.Workspace', related_name='membership', on_delete=CASCADE)
    user = models.ForeignKey('core.User', on_delete=CASCADE, null=True)
    invitation_hash = models.CharField(max_length=64, null=True, unique=True)
    invitation_email = models.CharField(max_length=1024, null=True)
    status = MemberStatusField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('core.User', on_delete=PROTECT, related_name='members_created')

    def save(self, *args, **kwargs):
        if not self.invitation_hash:
            self.invitation_hash = Member.objects.generate_invitation_hash()
        return super(Member, self).save(*args, **kwargs)


