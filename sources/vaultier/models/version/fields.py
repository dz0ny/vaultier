from django.db import models
from django.utils.importlib import import_module
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
            cls = None
            if handlers.has_key(value):
                cls = handlers[value]
            return cls

    def get_prep_value(self, value):
        if value:
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


handlers = {
}

