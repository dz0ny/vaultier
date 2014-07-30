from Crypto.Hash import SHA
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from base64 import b64decode
from django.contrib.auth.backends import ModelBackend
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):

        from vaultier.models import Token

        token = request.META.get('HTTP_X_VAULTIER_TOKEN')

        if token == None or token == '' or token == 'null':
            return (None)

        try:
            model = Token.objects.get(token=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not model.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        return (model.user, token)


class Backend(ModelBackend):
    @classmethod
    def verify(self, public_key, content, signature):
        signature = b64decode(signature)
        key = RSA.importKey(public_key)
        h = SHA.new(content)
        verifier = PKCS1_v1_5.new(key)
        return verifier.verify(h, signature)

    @classmethod
    def sign(self, private_key, content):
        key = RSA.importKey(private_key)
        h = SHA.new()
        h.update(content)
        signer = PKCS1_v1_5.new(key)
        sig = signer.sign(h)
        return sig.encode('base64')

    def authenticate(self, email=None, digest=None, signature=None):
        from vaultier.models import Token, User

        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            return None
        if (self.verify(user.public_key, email + digest, signature)):
            token = Token(user=user);
            token.save();
            return token

        return None


    def get_user(self, user_id):
        from vaultier.models import User

        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
