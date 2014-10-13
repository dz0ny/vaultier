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


class AclDirectionField(models.IntegerField):
    DIR_UP = -1
    DIR_CURRENT = 0
    DIR_DOWN = 1

    DIR_CHOICES = (
        (DIR_UP, 'UP'),
        (DIR_CURRENT, 'CURRENT'),
        (DIR_DOWN, 'DOWN')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.DIR_CHOICES
        super(AclDirectionField, self).__init__(*args, **kwargs)


class AclLevelField(models.IntegerField):
    LEVEL_READ = 10
    LEVEL_CREATE = 20
    LEVEL_WRITE = 30

    ACL_CHOICES = (
        (LEVEL_CREATE, 'CREATE'),
        (LEVEL_READ, 'READ'),
        (LEVEL_WRITE, 'WRITE'),
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ACL_CHOICES
        super(AclLevelField, self).__init__(*args, **kwargs)
