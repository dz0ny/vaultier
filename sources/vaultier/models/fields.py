from django.db import models
from django.db.models.fields import CharField


class LowerCaseCharField(CharField):
    """
    Defines a charfield which automatically converts all inputs to
    lowercase and saves.
    """

    def pre_save(self, model_instance, add):
        """
        Converts the string to lowercase before saving.
        """
        current_value = getattr(model_instance, self.attname)
        if (current_value):
            setattr(model_instance, self.attname, current_value.lower())
        return getattr(model_instance, self.attname)

    def to_python(self, value):
        value = super(LowerCaseCharField, self).to_python(value)
        if isinstance(value, basestring):
            return value.lower()
        return value


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


class MemberStatusField(models.IntegerField):

    STATUS_INVITED = 100
    STATUS_MEMBER_WITHOUT_WORKSPACE_KEY = 200
    STATUS_MEMBER = 300

    STATUS_CHOICES = (
            (STATUS_INVITED, 'INVITED'),
            (STATUS_MEMBER_WITHOUT_WORKSPACE_KEY, 'MEMBER_WITHOUT_WORKSPACE_KEY'),
            (STATUS_MEMBER, 'MEMBER'),
        )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.STATUS_CHOICES
        kwargs['default'] = 3
        super(MemberStatusField, self).__init__(*args, **kwargs)