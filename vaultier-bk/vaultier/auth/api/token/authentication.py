from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from vaultier.auth.lib.token_lifetime import TokenExpiredException, update_token_last_used_at
from vaultier.auth.models.token.model import Token

class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_X_VAULTIER_TOKEN')

        if token is None or token == '' or token == 'null':
            return None, None

        try:
            token = Token.objects.get(token=token)
            update_token_last_used_at(token)

        except TokenExpiredException, e:
            raise AuthenticationFailed(detail='Token expired')

        except Token.DoesNotExist, e:
            raise AuthenticationFailed(detail='Invalid token')

        if not token.user.is_active:
            raise AuthenticationFailed(detail='User is inactive')

        return token.user, token


