from datetime import datetime,timedelta
from django.conf import settings
from django.utils import timezone
from vaultier.auth.models.token.model import Token


class TokenExpiredException(Exception):
    message = 'Token expired'

def update_token_last_used_at(token):

    # get token renewal interval in seconds
    token_lifetime = settings.VAULTIER.get('auth_token_lifetime')
    td = timezone.now() - token.last_used_at

    # update last used at
    s = td.total_seconds()

    if td.total_seconds() < token_lifetime:
        # set to None to be overriden by token save method
        token.last_used_at = None
        token.save()
    else:
        raise TokenExpiredException()

def clean_old_tokens():
    token_lifetime = settings.VAULTIER.get('auth_token_lifetime')
    expired_date = datetime.now() - timedelta(seconds=token_lifetime)
    Token.objects.filter(last_used_at__lte=expired_date).delete()



