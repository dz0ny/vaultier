from django.db import models


class AclDirectionField(models.IntegerField):
    DIR_UP = -1
    DIR_DOWN = 1

    DIR_CHOICES = (
        (DIR_UP, 'UP'),
        (DIR_DOWN, 'DOWN')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.DIR_CHOICES
        super(AclDirectionField, self).__init__(*args, **kwargs)