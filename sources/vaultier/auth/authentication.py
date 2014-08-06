import time
from Crypto.Hash import SHA
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from base64 import b64decode
from django.contrib.auth.backends import ModelBackend
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from vaultier.models import Token, User

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
    def verify(self, public_key, content, timestamp, signature):
        signature = b64decode(signature)
        key = RSA.importKey(public_key)
        h = SHA.new(content+str(timestamp))
        verifier = PKCS1_v1_5.new(key)
        return verifier.verify(h, signature)

    @classmethod
    def sign(self, private_key, content, timestamp):
        key = RSA.importKey(private_key)
        h = SHA.new()
        h.update(content+str(timestamp))
        signer = PKCS1_v1_5.new(key)
        sig = signer.sign(h)
        return sig.encode('base64')

    def authenticate(self, email=None, timestamp=None, signature=None):

        # verify timestamp
        try:
            safe_delta = settings.BK_FEATURES.get('login_safe_timestamp_delta')
            safe_until = timestamp+safe_delta
            now = int(time.time())

            if ( safe_until < now):
                raise Exception('Login timestamp to old')
        except:
            return None

        #check database for user
        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            return None

        # verify signature
        if (self.verify(user.public_key, email, timestamp, signature)):
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
