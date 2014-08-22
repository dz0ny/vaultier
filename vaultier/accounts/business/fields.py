from rest_framework.fields import IntegerField


class RecoverTypeField(IntegerField):

    REBUILD = 1
    DISABLE = 2
