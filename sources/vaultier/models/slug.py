from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models.fields import PositiveIntegerField
from django.db.models.manager import Manager
from vaultier.tools.changes import ChangesMixin, post_change, INSERT, DELETE, UPDATE
from vaultier.tools.slugify import unique_slugify


class SlugManager(Manager):
    def on_model(self, signal=None, sender=None, instance=None, event_type=None, **kwargs):
        # create slug with new instance
        if event_type == INSERT:
            self.create_slug_for_model(instance)

        # create slug when name of instance changed. Slugs are not deleted (permalink pattern)
        if event_type == UPDATE and instance.old_changes().get('name'):
            self.create_slug_for_model(instance)

    def create_slug_for_model(self, model):
        # prepare query set to generate slug
        model_type = ContentType.objects.get_for_model(model)
        queryset = Slug.objects.all().exclude(
            object_id=model.id,
            content_type=model_type
        )

        # generate slugname
        slug_text = unique_slugify(model.name, queryset=queryset, default_slug=model.__class__.__name__)

        # if not slug exists, create
        if not Slug.objects.filter(
            object_id=model.id,
            content_type=model_type,
            slug=slug_text
        ).count():
            s = Slug(content_object=model, slug=slug_text)
            s.save()

        # update slug on model
        model.slug = slug_text
        model.save()


class Slug(models.Model):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_slug'

    objects = SlugManager()

    slug = models.CharField(max_length=255, unique=True, db_index=True)
    content_type = models.ForeignKey(ContentType)
    object_id = PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def register_signals(model):
    post_change.connect(Slug.objects.on_model, sender=model)
