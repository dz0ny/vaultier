from __future__ import absolute_import
from celery import shared_task
from vaultier.models.member.model import Member
from vaultier.models.token.model import Token
from vaultier.statistics.statistics import StatisticsManager


@shared_task()
def task_garbage_collector():
    """
    Removes expired tokens from DB
    """
    Token.objects.clean_old_tokens()
    Member.objects.clean_old_invitations()


def task_statistics_collector():
    """
    Collects statistics from database and sends them to vaultier.org
    """
    StatisticsManager.send_statistics()