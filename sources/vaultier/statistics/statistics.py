import requests
import json
from vaultier.models.member.model import Member
from vaultier.models.workspace.model import Workspace
from vaultier.models.vault.model import Vault
from vaultier.models.user.model import User
from vaultier.models.secret.model import Secret
from vaultier.models.card.model import Card
from django.conf import settings


class StatisticsManager(object):
    """
    Collects statistics about count of vaultier objects and sends them
    to central endpoint.
    """
    STATISTICS_ENDPOINT = 'http://vaultier.org/api/running-instances'

    @staticmethod
    def send_statistics():

        enabled = settings.VAULTIER.get('allow_anonymous_usage_statistics')
        if not enabled:
            return

        workspace_count = Workspace.objects.all().count()
        vault_count = Vault.objects.all().count()
        card_count = Card.objects.all().count()
        secret_count = Secret.objects.all().count()
        user_count = User.objects.all().count()
        member_count = Member.objects.all().count()

        payload = {'workspaces': workspace_count,
                   'vaults': vault_count,
                   'cards': card_count,
                   'secrets': secret_count,
                   'users': user_count,
                   'members': member_count}
        requests.post(StatisticsManager.STATISTICS_ENDPOINT, data=json.dumps(payload))