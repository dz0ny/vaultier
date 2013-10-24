from Crypto.Hash import SHA
from Crypto.Signature import PKCS1_v1_5
from base64 import b64decode
from django.contrib.auth.backends import ModelBackend
from core.models import User, Token
from Crypto.PublicKey import RSA
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_X_VAULTIER_TOKEN')

        if token == None or token == '':
            return (None)

        try:
            model = Token.objects.get(token=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not model.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        return (model.user, token)


class Backend(ModelBackend):
    def authenticate(self, email=None, signature=None):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None

        signature = b64decode(signature)
        key = RSA.importKey(user.public_key)
        h = SHA.new(user.email)
        verifier = PKCS1_v1_5.new(key)
        if (verifier.verify(h, signature)):
            token = Token(user=user);
            token.save();
            return token

        return None


    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None