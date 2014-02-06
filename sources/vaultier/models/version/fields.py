from django.db import models
from django.utils.importlib import import_module

class PythonClassField(models.CharField):
    description = "Field representing python class"
    __metaclass__ = models.SubfieldBase

    def __init__(self,  *args, **kwargs):
        self.name = "PythonClassField",
        self.max_length=255
        super(PythonClassField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        if value in ( None, ''):
            return None

        if not type(value)==type(''):
            return value

        else:
            module_name, class_name = value.split('.');
            module = import_module(module_name);
            cls = getattr(module, class_name);
            return cls

    def get_prep_value(self, value):
        if value:
            value = value.__module__ + "." + value.__class__.__name__
        else:
            value = ''
        return value


    def get_internal_type(self):
        return 'CharField'

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_prep_value(value)