from rest_framework import serializers
from accounts.serializers import RelatedUserSerializer
from cards.models import Card
from vaultier.business.fields import PermsField


class CardSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    created_by = RelatedUserSerializer(read_only=True)
    perms = PermsField()

    class Meta:
        model = Card
        fields = ('id', 'slug', 'name', 'description', 'vault', 'perms',
                  'created_at', 'updated_at', 'created_by',)


class RelatedCardSerializer(CardSerializer):

    class Meta(CardSerializer.Meta):
        fields = ('id', 'slug', 'name')
