from django.db import models


class RoleLevelField(models.IntegerField):
    LEVEL_CREATE = 50
    LEVEL_READ = 100
    LEVEL_WRITE = 200

    ROLE_CHOICES = (
        (LEVEL_CREATE, 'CREATE'),
        (LEVEL_READ, 'READ'),
        (LEVEL_WRITE, 'WRITE'),
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ROLE_CHOICES
        super(RoleLevelField, self).__init__(*args, **kwargs)