import time
from Crypto.Hash import SHA
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from base64 import b64decode
from datetime import datetime
from django.contrib.auth.backends import ModelBackend
from django.db.models.loading import get_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from accounts.models import LostKey, Token, User
from django.utils.timezone import utc


class TokenAuthentication(BaseAuthentication):

    def authenticate(self, request):
        token = request.META.get('HTTP_X_VAULTIER_TOKEN')

        if token is None or token == '' or token == 'null':
            return None, None

        try:
            model = Token.objects.get(token=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not model.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        return model.user, token


class HashAuthentication(BaseAuthentication):
    """
    Custom authentication for lostKey api
    """

    def authenticate(self, request, **kwargs):
        """
        Validates a lost_key request by hash, id, and expiration time
        """
        user_hash = request.QUERY_PARAMS.get('hash', None)
        if not user_hash:
            user_hash = request.DATA.get('hash')

        lost_key_id = request.parser_context.get('view').kwargs.get('pk')
        try:
            lost_key = LostKey.objects.get(hash=user_hash,
                                           pk=lost_key_id,
                                           expires_at__gte=datetime.utcnow().
                                           replace(tzinfo=utc),
                                           used=False)

            return lost_key.created_by, lost_key.hash
        except:
            return None


class Backend(ModelBackend):
    @classmethod
    def verify(cls, public_key, content, timestamp, signature):
        signature = b64decode(signature)
        key = RSA.importKey(public_key)
        h = SHA.new(content+str(timestamp))
        verifier = PKCS1_v1_5.new(key)
        return verifier.verify(h, signature)

    @classmethod
    def sign(cls, private_key, content, timestamp):
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

            if safe_until < now:
                raise Exception('Login timestamp to old')
        except:
            return None

        #check database for user
        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            return None

        # verify signature
        if Backend.verify(user.public_key, email, timestamp, signature):
            token = Token(user=user)
            token.save()
            return token

        return None

    def get_user(self, user_id):
        user_model = get_model('accounts', 'User')
        try:
            return user_model.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
