from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models.fields import PositiveIntegerField, CharField
from django.db.models.manager import Manager


class HistoryActionField(models.IntegerField):
    ACTION_CREATED = 10
    ACTION_MODIFIED = 20
    ACTION_MOVED = 30
    ACTION_DELETED = 40

    ACTION_CHOICES = (
        (ACTION_CREATED, 'CREATED'),
        (ACTION_MODIFIED, 'MODIFIED'),
        (ACTION_MOVED, 'MOVED'),
        (ACTION_DELETED, 'DELETED'),
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ACTION_CHOICES_CHOICES
        super(HistoryActionField, self).__init__(*args, **kwargs)

class HistoryActionAdapter(object):

    manager = None
    versioned = None

    def __init__(self, manager, history, **kwargs):
        self.manager = manager
        self.history = history
        super(HistoryActionAdapter, self).__init__(**kwargs);

    def create_history(self):
        # extract changes from changes mixin
        pass

    def get_reverted(self):
        # returns reverted instance of object with reverted values set
        pass

    def can_revert(self):
        return self.history.versioned == None


class VaultManager(Manager):
    def create_history(self, action_adapter_class, versioned, **kwargs ):
        adapter = action_adapter_class(self, versioned, **kwargs)
        adapter.create_history()

    def can_revert(self, history):
        return self.get_action_adapter(history).can_revert()

    def get_action_adapter(self, history):
        # decide action adapter by versioned and return instance
        pass

    def get_reverted(self, history):
        return self.get_action_adapter(history).get_reverted()

class History(models.Model):
    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_history'

    objects = VaultManager()

    def __unicode__(self):
        return 'History(' + str(self.id) + '):' + self.action_name + ':' + self.action_code

    # action definition
    action = HistoryActionField()
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