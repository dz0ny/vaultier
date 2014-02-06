from django.db import models
from django.utils.importlib import import_module

class PythonClassField(models.Field):
    description = "Field representing python class"
    __metaclass__ = models.SubfieldBase

    def __init__(self, help_text=("Python class"), verbose_name='pythonclassfield', *args, **kwargs):
        self.name = "PythonClassField",
        self.through = None
        self.help_text = help_text
        self.editable = True
        self.creates_table = False
        self.db_column = None
        self.serialize = False
        self.null = False
        self.creation_counter = models.Field.creation_counter
        models.Field.creation_counter += 1
        super(PythonClassField, self).__init__(*args, **kwargs)


    def db_type(self, connection):
        return 'varchar(255)'

    def to_python(self, value):
        if value in ( None, ''):
            return None
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