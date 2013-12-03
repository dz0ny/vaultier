from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from vaultier.models.secret_fields import SecretTypeField
from vaultier.tools.changes import ChangesMixin


class CardManager(Manager):
    def all_for_user(self, user):

        from vaultier.models.card import Card
        cards = Card.objects.filter(
            acl__user=user
        ).distinct()
        
        secrets = self.filter(
            card__in=cards
        )

        return secrets


class Secret(ChangesMixin, models.Model):

    class Meta:
        db_table = u'vaultier_secret'
        app_label = 'vaultier'

    objects = CardManager()

    name = models.CharField(max_length=255, default='', blank=True, null=True)
    type = SecretTypeField()
    data = models.TextField(null=True, blank=True)
    card = models.ForeignKey('vaultier.Card', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


