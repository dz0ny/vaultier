from __future__ import absolute_import
from celery import shared_task
from .models import Member
from .models import Token


@shared_task()
def task_garbage_collector():
    """
    Removes expired tokens from DB
    """
    Token.objects.clean_old_tokens()
    Member.objects.clean_old_invitations()
