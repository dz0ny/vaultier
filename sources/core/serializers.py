from models import Vault
from rest_framework import serializers

class VaultSerializer(serializers.HyperlinkedModelSerializer):
    created_at = serializers.Field()
    updated_at = serializers.Field()

    def validate_name(self, attrs, source):
        """
        Check that the blog post is about Django.
        """
        value = attrs[source]
        if "django" not in value.lower():
            raise serializers.ValidationError("Blog post is not about Django")
        return attrs

    class Meta:
        model = Vault
        fields = ('id', 'name', 'url', 'created_at', 'updated_at', 'description')

