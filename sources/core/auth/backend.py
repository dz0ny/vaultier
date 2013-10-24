from Crypto.Hash import SHA
from Crypto.Signature import PKCS1_v1_5
import random
import string

from base64 import b64decode
from django.contrib.auth.backends import ModelBackend
from core.models import User

from Crypto.PublicKey import RSA
# from Crypto.Cipher import PKCS1_v1_5


class HandshakeCoder:

    def encode(self, hash, publicKey):
        rsakey = RSA.importKey(publicKey)
        # rsakey = PKCS1_v1_5.new(rsakey)
        # encrypted = rsakey.encrypt(hash).encode('base64')
        # return encrypted

    def decode(self, encoded, privateKey):
        #use proper private key
        privateKey = open('/root/testrsa/private.pem', "r").read()
        # rsakey = RSA.importKey(privateKey)
        # rsakey = PKCS1_OAEP.new(rsakey)
        # decrypted = rsakey.decrypt(b64decode(encoded))
        # return decrypted


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
        if (verifier.verify(h, signature)) :
            return user

        return None


    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None