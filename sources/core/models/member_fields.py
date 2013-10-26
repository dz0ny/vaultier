from django.db import models

class MemberStatusField(models.IntegerField):

    STATUS_INVITED = 100
    STATUS_NON_APPROVED_MEMBER = 200
    STATUS_MEMBER = 300

    STATUS_CHOICES = (
            (STATUS_INVITED, 'INVITED'),
            (STATUS_NON_APPROVED_MEMBER, 'NON_APPROVED_MEMBER'),
            (STATUS_MEMBER, 'MEMBER'),
        )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.STATUS_CHOICES
        kwargs['default'] = 3
        super(MemberStatusField, self).__init__(*args, **kwargs)