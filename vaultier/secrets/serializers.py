from rest_framework import serializers
from accounts.serializers import RelatedUserSerializer
from secrets.business.fields import SecretPermsField, BlobDataField
from secrets.models import Secret


class SecretSerializer(serializers.ModelSerializer):
    created_by = RelatedUserSerializer(read_only=True)
    perms = SecretPermsField()
    blob_meta = serializers.CharField(read_only=True)

    def restore_fields(self, data, files):
        if self.context.get('view').action == 'update' or \
                self.context.get('view').action == 'partial_update':
            self.fields.get('type').read_only = True
        return super(SecretSerializer, self).restore_fields(data, files)

    class Meta:
        model = Secret
        fields = ('id', 'type', 'name', 'data', 'blob_meta', 'card', 'perms',
                  'created_at', 'updated_at', 'created_by')


class SecretBlobSerializer(serializers.ModelSerializer):
    created_by = RelatedUserSerializer(read_only=True)
    blob_data = BlobDataField()

    class Meta:
        model = Secret
        fields = ('id', 'blob_meta', 'blob_data')
