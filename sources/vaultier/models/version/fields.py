from django.db import models
from six import string_types


class PythonClassField(models.CharField):
    description = "Field representing python class"
    __metaclass__ = models.SubfieldBase

    def __init__(self,   *args, **kwargs):
        self.name = "PythonClassField",
        self.max_length = 255
        self.default = None
        super(PythonClassField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if value in ( None, ''):
            return None

        if not isinstance(value, string_types):
            return value

        else:
            from handler import handlers
            cls = None
            if handlers.has_key(value):
                cls = handlers[value]
            else:
                raise AttributeError('handler class for "{name}" not found'.format(name=value))

    def get_prep_value(self, value):
        if value:
            from handler import handlers
            for key in handlers:
                if value==handlers[key]:
                    return key
        else:
            return None


    def get_internal_type(self):
        return 'CharField'

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_prep_value(value)

