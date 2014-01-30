from django.db import models
from django.db.models.deletion import PROTECT, CASCADE
from django.db.models.manager import Manager
from vaultier.models.fields import AclLevelField, SecretTypeField
from vaultier.tools.changes import ChangesMixin


class SecretManager(Manager):
    def all_for_user(self, user):
        from vaultier.models.card import Card

        cards = Card.objects.filter(
            acl__user=user,
            acl__level=AclLevelField.LEVEL_READ
        ).distinct()

        secrets = self.filter(
            card__in=cards
        )

        return secrets


class Secret(ChangesMixin, models.Model):
    class Meta:
        db_table = u'vaultier_secret'
        app_label = 'vaultier'

    objects = SecretManager()

    name = models.CharField(max_length=255, default='', blank=True, null=True)
    type = SecretTypeField()
    data = models.TextField(null=True, blank=True)
    blob = models.OneToOneField('vaultier.SecretBlob',
        null=True,
        blank=True,
        on_delete=CASCADE
    )
    card = models.ForeignKey('vaultier.Card', on_delete=CASCADE)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


