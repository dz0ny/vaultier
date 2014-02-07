from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models import Manager
from django.db.models.deletion import PROTECT
from django.db.models.fields import PositiveIntegerField, CharField
from django.utils.importlib import import_module
import jsonfield
from vaultier.models.version.fields import PythonClassField

class VersionManager(Manager):

    def create_version(self, action_adapter_class, versioned, **kwargs ):
        adapter = action_adapter_class(self, versioned, **kwargs)
        return adapter.create_version(**kwargs)

    def can_revert(self, version, **kwargs):
        return self.get_action_adapter(version).can_revert(**kwargs)

    def get_action_adapter(self, version,**kwargs):
        module_name, class_name = version.action_adapter.split(".");
        module = import_module(module_name);
        adapter_cls = getattr(module, class_name);
        return adapter_cls(self, version,**kwargs)

    def get_reverted(self, version,**kwargs):
        return self.get_action_adapter(version).get_reverted(**kwargs)

class Version(models.Model):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_version'

    objects = VersionManager()

    def __unicode__(self):
        return 'Version(' + str(self.id) + '):' + self.action_name + ':' + self.action_code

    # action definition
    action_id = PositiveIntegerField(null=True)
    action_name = CharField(max_length=16, null=True)
    handler_cls = PythonClassField(max_length=255)

    # serialized object representation
    object_data = jsonfield.JSONField(help_text="The serialized form of this version of the model.")
    object_fields =  jsonfield.JSONField(help_text="The serialized form of affected model fields.")
    object_repr = models.TextField(help_text="A string representation of the object.")

    # versioned object relation
    versioned_type = models.ForeignKey(ContentType, related_name='version_versioned')
    versioned_id = PositiveIntegerField()
    versioned = GenericForeignKey('versioned_type', 'versioned_id')

    # versioned_parent object relation
    versioned_parent_type = models.ForeignKey(ContentType, related_name='version_versioned_parent')
    versioned_parent_id = PositiveIntegerField()
    versioned_parent = GenericForeignKey('versioned_parent_type', 'versioned_parent_id')

    # timestamp and created_by
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('vaultier.User', on_delete=PROTECT, null=True)


