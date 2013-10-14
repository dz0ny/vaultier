import random
import string

from base64 import b64decode
from django.contrib.auth.backends import ModelBackend
from core.models import User

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5


class HandshakeCoder:
    """
    Takes care about PPK encoding and decoding

    https://launchkey.com/docs/api/encryption/python/pycrypto#decrypt
    """

    def handshake(self, username, session):
        """
        Returns handshake and stores it in session
        """
        d = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(32))
        user = User.objects.get(email=username)
        session['auth.digest'] = d;
        encoded = self.encode(d, user.public_key)

        return {
            'user': username,
            'challenge': encoded,
            'password': d
        }

    def encode(self, hash, publicKey):
        rsakey = RSA.importKey(publicKey)
        rsakey = PKCS1_v1_5.new(rsakey)
        encrypted = rsakey.encrypt(hash).encode('base64')
        return encrypted

    def decode(self, encoded, privateKey):
        #use proper private key
        privateKey = open('/root/testrsa/private.pem', "r").read()
        rsakey = RSA.importKey(privateKey)
        rsakey = PKCS1_OAEP.new(rsakey)
        decrypted = rsakey.decrypt(b64decode(encoded))
        return decrypted


class Backend(ModelBackend):
    """
    Authenticate against the settings ADMIN_LOGIN and ADMIN_PASSWORD.

    Use the login name, and a hash of the password. For example:

    ADMIN_LOGIN = 'admin'
    ADMIN_PASSWORD = 'sha1$4e987$afbcf42e21bd417fb71db8c66b321e9fc33051de'
    """

    def authenticate(self, username=None, password=None, session=None):
        # login_valid = ('admin' == username)
        # pwd_valid = check_password(password, 'sha1$4e987$afbcf42e21bd417fb71db8c66b321e9fc33051de')
        # pwd_valid = (password == 'admin')

        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None

        d = session.get('auth.digest', None);
        if (d == password and d is not None):
            return user

        return None


    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None