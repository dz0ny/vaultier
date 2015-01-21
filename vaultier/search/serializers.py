from rest_framework import serializers


class SearchSerializer(serializers.Serializer):
    query = serializers.CharField(required=True, max_length=100, min_length=1)
    type = serializers.CharField(required=False, max_length=100, min_length=1)


class SearchResultSerializer(serializers.Serializer):
    def to_native(self, obj):
        result = {
            'vaults': [],
            'cards': []
        }

        return result
