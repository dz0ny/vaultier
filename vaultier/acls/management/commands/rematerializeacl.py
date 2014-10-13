from django.core.management.base import BaseCommand
from accounts.business.fields import MemberStatusField

from acls.models import Acl, Role
from acls.business.perms.materializer import CreateRoleMaterializer


class Command(BaseCommand):

    def handle(self, *command_args, **command_options):
        Acl.objects.all().delete()
        for role in Role.objects.all():
            if not role.member.status == MemberStatusField.STATUS_INVITED:
                m = CreateRoleMaterializer(role)
                m.materialize(role.get_object())
