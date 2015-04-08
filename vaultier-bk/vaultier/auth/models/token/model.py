import random
from datetime import datetime

import pytz
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, DateTimeField
from django.db.models.fields.related import ForeignKey

from vaultier.auth.models.token.manager import TokenManager
from vaultier.utils.lib.changes.changes import ChangesMixin


class Token(ChangesMixin, Model):

    TOKEN_LENGTH = 64
    """
    Length of generated token
    """
    token = CharField(max_length=TOKEN_LENGTH, unique=True,
                             db_index=True)
    user = ForeignKey('vaultier_auth.User', on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    last_used_at = DateTimeField(null=True)

    objects = TokenManager()

    class Meta:
        db_table = u'vaultier_token'
        app_label = 'vaultier_auth'

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_token()
        if not self.last_used_at:
            self.last_used_at = datetime.now(pytz.utc)
        return super(Token, self).save(*args, **kwargs)

    def generate_token(self):
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW' \
                'XYZ!"#$%&\()*+,-./:;<=>?@[\]^_`{|}~'
        unique = ''.join(random.choice(chars) for i in range(
            Token.TOKEN_LENGTH))
        return unique

    def __unicode__(self):
        return self.key
