from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models.fields import PositiveIntegerField, CharField
from vaultier.models.version.manager import VersionManager

class Version(models.Model):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_version'

    objects = VersionManager()

    def __unicode__(self):
        return 'Version(' + str(self.id) + '):' + self.action_name + ':' + self.action_code

    # action definition
    action = PositiveIntegerField()
    action_name = CharField(max_length=16)

    # serialized object representation
    object_data = models.TextField(help_text="The serialized form of this version of the model.")
    object_fields =  models.TextField(help_text="The serialized form of affected model fields.")
    object_repr = models.TextField(help_text="A string representation of the object.")

    # versioned object relation
    versioned_type = models.ForeignKey(ContentType)
    versioned_id = PositiveIntegerField()
    versioned = GenericForeignKey('versioned_type', 'versioned_id')

    # versioned_parent object relation
    versioned_parent_type = models.ForeignKey(ContentType)
    versioned_parent_id = PositiveIntegerField()
    versioned_parent = GenericForeignKey('versioned_parent_type', 'versioned_parent_id')

    # timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)