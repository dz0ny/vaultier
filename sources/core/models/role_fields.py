from django.db import models

__author__ = 'jan'


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

class RoleTypeField(models.IntegerField):
    TYPE_WORKSPACE = 100
    TYPE_VAULT = 200
    TYPE_CARD = 300

    ACL_CHOICES = (
        (TYPE_WORKSPACE, 'WORKSPACE'),
        (TYPE_VAULT, 'VAULT'),
        (TYPE_CARD, 'CARD')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ACL_CHOICES
        super(RoleTypeField, self).__init__(*args, **kwargs)