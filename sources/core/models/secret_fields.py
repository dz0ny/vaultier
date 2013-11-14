from django.db import models

class SecretTypeField(models.IntegerField):
    SECRET_TYPE_NOTE = 100
    SECRET_TYPE_PASSWORD = 200
    SECRET_TYPE_FILE = 300

    SECRET_TYPE_CHOICES = (
        (SECRET_TYPE_NOTE, 'NOTE'),
        (SECRET_TYPE_FILE, 'FILE'),
        (SECRET_TYPE_PASSWORD, 'PASSWORD')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.SECRET_TYPE_CHOICES
        super(SecretTypeField, self).__init__(*args, **kwargs)