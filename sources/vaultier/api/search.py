from rest_framework.fields import CharField
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from vaultier.api import ApiException
from vaultier.api.card import CardSerializer
from vaultier.api.vault import VaultSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.card import Card
from vaultier.models.vault import Vault


class SearchSerializer(serializers.Serializer):
    query = CharField(required=True, max_length=100, min_length=1)

class SearchResultSerializer(serializers.Serializer):
    def to_native(self, obj):
        result = {
            'vaults' :[],
            'cards': []
        }

        vaults = obj.get('vaults');
        if (vaults and len(vaults)):
            for vault in vaults:
                result.get('vaults').append(VaultSerializer(instance=vault, context=self.context).data)

        cards = obj.get('cards');
        if (cards and len(cards)):
            for card in cards:
                result.get('cards').append(CardSerializer(instance=card, context=self.context).data)

        return result

class SearchView(APIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return self.search(request)

    def search(self, request):
        max_results  = 5
        serializer = SearchSerializer(data=self.request.QUERY_PARAMS)
        if serializer.is_valid():
            try:
                query = serializer.data.get('query')
                vaults = Vault.objects.search(request.user,query, max_results=max_results)
                cards = Card.objects.search(request.user,query, max_results=max_results)

                results = SearchResultSerializer(instance={'vaults': vaults, 'cards': cards}, context={'request': request})
                return Response(data=results.data)

            except Exception as e:
                raise ApiException(exception=e)

        raise ApiException(detail=serializer.errors)


