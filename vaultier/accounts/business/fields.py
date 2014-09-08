from django.db import models
from rest_framework.fields import IntegerField


class RecoverTypeField(IntegerField):

    REBUILD = 1
    DISABLE = 2


class MemberStatusField(models.IntegerField):

    STATUS_INVITED = 100
    STATUS_MEMBER_WITHOUT_WORKSPACE_KEY = 200
    STATUS_MEMBER = 300
    STATUS_MEMBER_BROKEN = 400

    STATUS_CHOICES = (
        (STATUS_INVITED, 'INVITED'),
        (STATUS_MEMBER_WITHOUT_WORKSPACE_KEY, 'MEMBER_WITHOUT_WORKSPACE_KEY'),
        (STATUS_MEMBER, 'MEMBER'),
        (STATUS_MEMBER_BROKEN, 'MEMBER_WITH_LOST_KEY')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.STATUS_CHOICES
        kwargs['default'] = 3
        super(MemberStatusField, self).__init__(*args, **kwargs)
