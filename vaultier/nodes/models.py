from mptt import models as mpttmodels


# class Node(mpttmodels.MPTTModel):
#     parent = mpttmodels.TreeForeignKey(
#         'self', null=True, blank=True, related_name='children')
