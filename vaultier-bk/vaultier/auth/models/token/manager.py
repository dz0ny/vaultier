import datetime
from datetime import timedelta
from django.db.models.manager import Manager
from django.conf import settings

class TokenManager(Manager):

    def clean_old_tokens(self):
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        expired_date = datetime.now() - timedelta(hours=token_lifetime)
        self.filter(last_used_at__lte=expired_date).delete()
