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
    class Meta:
        abstract = True

    _manipulator = None

    def __unicode__(self):
        return 'Version(' + str(self.id) + '):' + self.action_name + ':' + self.action_code

    def get_manipulator(self):
        if not self._manipulator:
            from modelext.version.manipulator import factory_manipulator

            self._manipulator = factory_manipulator(self, self.manipulator_id)
        return self._manipulator

    # action definition
    action_id = PositiveIntegerField(null=True)
    action_name = CharField(max_length=16, null=True)
    manipulator_id = VersionManipulatorIdField(max_length=255)

    # serialized object representation
    revert_data = jsonfield.JSONField(help_text="The serialized form of this version of the model.")
    revert_fields = jsonfield.JSONField(help_text="The serialized form of affected model fields.")

    # versioned object relation
    versioned_type = models.ForeignKey(ContentType, related_name='version_versioned')
    versioned_id = PositiveIntegerField()
    versioned = GenericForeignKey('versioned_type', 'versioned_id')

    # versioned_parent object relation
    versioned_parent_type = models.ForeignKey(ContentType, related_name='version_versioned_parent', null=True)
    versioned_parent_id = PositiveIntegerField(null=True)
    versioned_parent = GenericForeignKey('versioned_parent_type', 'versioned_parent_id')

    # timestamp and created_by
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        getattr(settings, 'AUTH_USER_MODEL', 'auth.User'),
        on_delete=PROTECT,
        null=True)


