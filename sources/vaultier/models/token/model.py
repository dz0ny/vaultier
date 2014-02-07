import uuid
import hmac
from hashlib import sha1

from django.db import models
from django.db.models.deletion import CASCADE

from modelext.changes.changes import ChangesMixin


class Token(ChangesMixin, models.Model):
    token = models.CharField(max_length=64)
    user = models.ForeignKey('vaultier.User', on_delete=CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_token()
        return super(Token, self).save(*args, **kwargs)

    def generate_token(self):
        unique = uuid.uuid4()
        return hmac.new(unique.bytes, digestmod=sha1).hexdigest()

    def __unicode__(self):
        return self.key

    class Meta:
        db_table = u'vaultier_token'
        app_label = 'vaultier'
