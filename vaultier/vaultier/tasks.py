from __future__ import absolute_import

from vaultier.statistics.statistics import StatisticsManager
from celery import shared_task


@shared_task()
def task_statistics_collector():
    """
    Collects statistics from database and sends them to vaultier.org
    """
    StatisticsManager.send_statistics()
