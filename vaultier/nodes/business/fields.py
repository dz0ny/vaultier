from rest_framework.fields import FileField
from django.core.exceptions import ValidationError


class BlobDataField(FileField):
    """
    Field for Blob Data. Use in serializer
    """

    def to_native(self, value):
        """
        Read file (if we got file)
        """
        if value:
            return value.read()
        return None

    def from_native(self, data):
        """
        File upload
        """
        # in bytes
        max_size = 2 * 10 * 1024 * 1024  # 10 mb
        if not data:
            raise ValidationError('At least blob_data must be specified')

        if data and hasattr(data, 'size') and data.size > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        if data and not hasattr(data, 'size') and len(data) > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        try:
            data.read().decode('utf-8')
        except UnicodeDecodeError:
            raise ValidationError('Not valid data')

        return super(BlobDataField, self).from_native(data)
