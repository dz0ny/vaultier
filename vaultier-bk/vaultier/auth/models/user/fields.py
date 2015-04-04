from django.db.models.fields import IntegerField

class MemberStatusField(IntegerField):

    STATUS_INVITED = 100
    STATUS_WITHOUT_WORKSPACE_KEY = 200
    STATUS_USER = 300
    STATUS_BROKEN_KEY = 400

    STATUS_CHOICES = (
        (STATUS_INVITED, 'INVITED'),
        (STATUS_WITHOUT_WORKSPACE_KEY, 'STATUS_WITHOUT_WORKSPACE_KEY'),
        (STATUS_USER, 'STATUS_USER'),
        (STATUS_BROKEN_KEY, 'STATUS_BROKEN_KEY')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.STATUS_CHOICES
        kwargs['default'] = 3
        super(MemberStatusField, self).__init__(*args, **kwargs)
