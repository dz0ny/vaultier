from django.db import models
from django.db.models.fields import PositiveIntegerField
from django.db.models.fields.related import OneToOneField
from reversion.models import Revision

class History(models.Model):
    revision = OneToOneField(Revision)  # This is required
    action_type =  PositiveIntegerField()
    parent_object_id = PositiveIntegerField()
    parent_object_type = PositiveIntegerField()
