from django.conf import settings
from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models.deletion import PROTECT
from django.db.models.fields import PositiveIntegerField, CharField
import jsonfield


class VersionManipulatorIdField(models.CharField):
    def __init__(self, *args, **kwargs):
        self.name = "VersionManipulatorIdField",
        self.null = False
        self.max_length = 255
        self.default = None
        super(VersionManipulatorIdField, self).__init__(*args, **kwargs)


class VersionMixin(models.Model):
    _manipulator = None

    action_id = PositiveIntegerField(null=True)

    # action definition
    action_name = CharField(max_length=16, null=True)
    manipulator_id = VersionManipulatorIdField(max_length=255)
    revert_data = jsonfield.JSONField(
        help_text="The serialized form of this version of the model.")

    # serialized object representation
    revert_fields = jsonfield.JSONField(
        help_text="The serialized form of affected model fields.")
    versioned_type = models.ForeignKey(ContentType,
                                       related_name='version_versioned')
    versioned_id = PositiveIntegerField()

    # versioned object relation
    versioned = GenericForeignKey('versioned_type', 'versioned_id')
    versioned_related_type = models.ForeignKey(
        ContentType,
        related_name='version_versioned_related',
        null=True)

    # versioned_related object relation
    versioned_related_id = PositiveIntegerField(null=True)
    versioned_related = GenericForeignKey('versioned_related_type',
                                          'versioned_related_id')
    created_at = models.DateTimeField(auto_now_add=True)

    # timestamp and created_by
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=PROTECT,
                                   null=True)

    class Meta:
        abstract = True

    def get_manipulator(self):
        if not self._manipulator:
            from libs.version.manipulator import factory_manipulator

            self._manipulator = factory_manipulator(self, self.manipulator_id)
        return self._manipulator

    def __unicode__(self):
        return 'Version({}):{}:{}'.format(self.id, self.action_name,
                                          self.action_code)
