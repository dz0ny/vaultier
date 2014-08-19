from __future__ import absolute_import
from celery import shared_task
from vaultier.models.token.model import Token


@shared_task()
def task_token_garbage_collector():
    """
    Removes expired tokens from DB
    """
    Token.objects.clean_old_tokens()