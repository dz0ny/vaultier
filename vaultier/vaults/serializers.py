from rest_framework import serializers
from accounts.serializers import RelatedUserSerializer
from vaultier.business.fields import PermsField
from vaults.models import Vault


class VaultSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    created_by = RelatedUserSerializer(read_only=True)
    perms = PermsField()

    def restore_fields(self, data, files):
        if self.context.get('view').action != 'create':
            self.fields.get('workspace').read_only = True
        return super(VaultSerializer, self).restore_fields(data, files)

    class Meta:
        model = Vault
        fields = ('id', 'slug', 'name', 'color', 'description', 'workspace',
                  'perms', 'created_at', 'updated_at', 'created_by')


class RelatedVaultSerializer(VaultSerializer):

    class Meta(VaultSerializer.Meta):
        fields = ['id', 'slug', 'name', 'color']
