from django.contrib.contenttypes.generic import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

class Tree(MPTTModel):
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children')
    data_id = models.PositiveIntegerField()
    data_content_type = models.ForeignKey(ContentType)
    data = GenericForeignKey('data_content_type', 'data_id')

    class Meta:
        app_label = 'vaultier'
        db_table = u'vaultier_tree'

    #class MPTTMeta:
    #    order_insertion_by = ['id']