import random
from datetime import timedelta, datetime
from django.conf import settings

from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone

from modelext.changes.changes import ChangesMixin


class TokenManager(models.Manager):

    def clean_old_tokens(self):
        token_lifetime = settings.VAULTIER.get('authentication_token_lifetime')
        expired_date = datetime.now() - timedelta(hours=token_lifetime)
        self.filter(last_used_at__lte=expired_date).delete()


class Token(ChangesMixin, models.Model):
    TOKEN_LENGTH = 64
    """
    Length of generated token
    """

    objects = TokenManager()

    token = models.CharField(max_length=TOKEN_LENGTH, unique=True, db_index=True)
    user = models.ForeignKey('vaultier.User', on_delete=CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_used_at = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_token()
        if not self.last_used_at:
            self.last_used_at = timezone.now()
        return super(Token, self).save(*args, **kwargs)

    def generate_token(self):
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\()*+,-./:;<=>?@[\]^_`{|}~'
        unique = ''.join(random.choice(chars) for i in range(Token.TOKEN_LENGTH))
        return unique

    def __unicode__(self):
        return self.key

    class Meta:
        db_table = u'vaultier_token'
        app_label = 'vaultier'
