from Crypto.Hash import SHA
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from base64 import b64decode
from datetime import datetime, timedelta
from dateutil import parser as dateparser
from django.utils import timezone
from django.conf import settings
from vaultier.auth.models.token.model import Token
from vaultier.auth.models.user.model import User


class InvalidServerTimeException(Exception):
    message = 'Invalid server time'
    pass


class InvalidSignatureException(Exception):
    message = 'Invalid signature'
    pass

class InvalidUserException(Exception):
    message = 'Invalid user'
    pass

class CannotAuthenticateException(Exception):
    message = 'Cannot authenticate'
    pass

class Authenticator(object):
    @classmethod
    def verify(cls, public_key, content, date, signature):
        """
        :param public_key:
        :param content:
        :param date:
        :param signature:
        :return:
        """
        signature = b64decode(signature)
        key = RSA.importKey(public_key)
        h = SHA.new(content + str(date))
        verifier = PKCS1_v1_5.new(key)
        return verifier.verify(h, signature)


    @classmethod
    def sign(cls, private_key, content, timestamp):
        """
        This is not production code, it is used in tests only

        :param private_key:
        :param content:
        :param timestamp:
        :return:
        """
        key = RSA.importKey(private_key)
        h = SHA.new()
        h.update(content + str(timestamp))
        signer = PKCS1_v1_5.new(key)
        sig = signer.sign(h)
        return sig.encode('base64')

    @classmethod
    def _create_token(cls, user):
        """
        Create new authentication token for user

        :param user:
        :return: Token
        """
        return Token.objects.create(user=user)

    @classmethod
    def authenticate(cls, email=None, date=None, signature=None):

        # parse server time
        try:
            date_parsed = dateparser.parse(date)
            safe_delta = timedelta(seconds=settings.VAULTIER.get('login_safe_timestamp'))
            safe_until = date_parsed + safe_delta
            now = timezone.now()
        except Exception, e:
            raise InvalidServerTimeException(e)

        # validate server time
        if safe_until < now:
            raise InvalidServerTimeException()

        # check database for user
        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist, e:
            raise InvalidUserException(e)

        # verify signature
        try:
            if cls.verify(user.public_key, email, date, signature):
                return cls._create_token(user)
        except Exception, e:
            raise InvalidSignatureException(e)

        raise CannotAuthenticateException()
