from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.utils.encoding import smart_text
from rest_framework.relations import PrimaryKeyRelatedField, SlugRelatedField, RelatedField
from django.utils.translation import ugettext_lazy as _

class RelatedNestedField(RelatedField):
    serializer = None
    id_field = 'id'
    read_only = False

    default_error_messages = {
        'does_not_exist': _("Object with %s=%s does not exist."),
        'invalid': _('Invalid value.'),
    }

    def __init__(self, *args, **kwargs):
        self.id_field = kwargs.pop('id_field', self.id_field)
        self.serializer = kwargs.pop('serializer', None)
        assert self.serializer, 'serializer is required'
        super(RelatedNestedField, self).__init__(*args, **kwargs)

        return super(RelatedNestedField, self).__init__(*args, **kwargs)

    def to_native(self, obj):
        return self.serializer().to_native(obj)

    def from_native(self, data):
        if self.queryset is None:
            raise Exception('Writable related fields must include a `queryset` argument')

        try:
            return self.queryset.get(**{self.id_field: data})
        except ObjectDoesNotExist:
            raise ValidationError(self.error_messages['does_not_exist'] %
                                  (self.id_field, smart_text(data)))
        except (TypeError, ValueError):
            msg = self.error_messages['invalid']
            raise ValidationError(msg)
