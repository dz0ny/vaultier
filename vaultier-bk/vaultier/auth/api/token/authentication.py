from django.utils import timezone
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from vaultier.auth.models.token.model import Token
from django.conf import settings

class TokenAuthentication(BaseAuthentication):

    def authenticate(self, request):
        token = request.META.get('HTTP_X_VAULTIER_TOKEN')

        if token is None or token == '' or token == 'null':
            return None, None

        try:
            model = Token.objects.get(token=token)
            token_renewal_interval = settings.VAULTIER.get('authentication_token_renewal_interval')

            #convert to seconds
            token_renewal_interval *= 60

            td = timezone.now() - model.last_used_at
            if td.total_seconds() > token_renewal_interval:
                model.last_used_at = timezone.now()
                model.save()

        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not model.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        return model.user, token


