from django.db import models

class RoleLevelField(models.IntegerField):
    LEVEL_READ = 100
    LEVEL_WRITE = 200

    ACL_CHOICES = (
        (LEVEL_READ, 'READ'),
        (LEVEL_WRITE, 'WRITE')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ACL_CHOICES
        super(RoleLevelField, self).__init__(*args, **kwargs)

