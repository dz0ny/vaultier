from django.db import models

class ObjectReference(object):

    def compute_type(self, force=None):
        if not self.type or force:
            type_set = False

            if self.to_workspace:
                if type_set:
                    raise RuntimeError('Role can reference only one object')
                self.type = ObjectReferenceTypeField.TYPE_WORKSPACE
                type_set = True

            if self.to_vault:
                if type_set:
                    raise RuntimeError('Role can reference only one object')
                self.type = ObjectReferenceTypeField.TYPE_VAULT
                type_set = True

            if self.to_card:
                if type_set:
                    raise RuntimeError('Role can reference only one object')
                self.type = ObjectReferenceTypeField.TYPE_CARD
                type_set = True

        if not self.type:
            raise RuntimeError('Role has no associated object')

    def get_object(self):
        self.compute_type()
        if self.type == ObjectReferenceTypeField.TYPE_WORKSPACE:
            return self.to_workspace
        if self.type == ObjectReferenceTypeField.TYPE_VAULT:
            return self.to_vault
        if self.type == ObjectReferenceTypeField.TYPE_CARD:
            return self.to_card

        raise RuntimeError('Role has no associated object')


    def set_object(self, object):
        self.to_workspace = None
        self.to_vault = None
        self.to_card = None
        self.type = None

        if not object:
            return

        if object.__class__.__name__ == 'Workspace':
            self.to_workspace = object

        if object.__class__.__name__ == 'Vault':
            self.to_vault = object

        if object.__class__.__name__ == 'Card':
            self.to_card = object

        self.compute_type()
        return


class ObjectReferenceTypeField(models.IntegerField):
    TYPE_WORKSPACE = 100
    TYPE_VAULT = 200
    TYPE_CARD = 300

    ACL_CHOICES = (
        (TYPE_WORKSPACE, 'WORKSPACE'),
        (TYPE_VAULT, 'VAULT'),
        (TYPE_CARD, 'CARD')
    )

    def __init__(self, *args, **kwargs):
        kwargs['choices'] = self.ACL_CHOICES
        super(ObjectReferenceTypeField, self).__init__(*args, **kwargs)