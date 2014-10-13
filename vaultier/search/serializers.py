from rest_framework import serializers
from cards.serializers import CardSerializer
from vaults.serializers import VaultSerializer, RelatedVaultSerializer
from workspaces.serializers import RelatedWorkspaceSerializer


class SearchSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, max_length=100, min_length=1)
    type = serializers.CharField(required=False, max_length=100, min_length=1)


class SearchVaultSerializer(VaultSerializer):
    workspace = RelatedWorkspaceSerializer()


class SearchCardSerializer(CardSerializer):
    workspace = serializers.SerializerMethodField('get_workspace')
    vault = RelatedVaultSerializer()

    def get_workspace(self, obj):
        return RelatedWorkspaceSerializer(instance=obj.vault.workspace).data

    class Meta(CardSerializer.Meta):
        fields = CardSerializer.Meta.fields + ('workspace',)


class SearchResultSerializer(serializers.Serializer):
    def to_native(self, obj):
        result = {
            'vaults': [],
            'cards': []
        }

        vaults = obj.get('vaults')
        if vaults and len(vaults):
            for vault in vaults:
                result.get('vaults').append(
                    SearchVaultSerializer(instance=vault,
                                          context=self.context).data)

        cards = obj.get('cards')
        if cards and len(cards):
            for card in cards:
                result.get('cards').append(
                    SearchCardSerializer(instance=card,
                                         context=self.context).data)

        return result
