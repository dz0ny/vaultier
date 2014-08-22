from django.db import models
from django.db.models.manager import Manager
from libs.changes.changes import post_change
from libs.slugify.model import SlugManagerMixin, SlugMixin


class SlugManager(SlugManagerMixin, Manager):
    pass


class Slug(SlugMixin, models.Model):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_slug'

    objects = SlugManager()


def register_signals(model):
    post_change.connect(Slug.objects.on_model, sender=model)
