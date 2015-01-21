from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from search.serializers import SearchSerializer, SearchResultSerializer
from vaultier.business.exceptions import CustomAPIException


class SearchView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return self.search(request)

    def include_type(self, value, type):
        if value:
            return type in value.lower()
        else:
            return True

    def search(self, request):
        max_results = 5
        serializer = SearchSerializer(data=self.request.QUERY_PARAMS)
        if serializer.is_valid():
            try:
                query = serializer.data.get('query')
                type = serializer.data.get('type')

                vaults = []
                cards = []

                results = SearchResultSerializer(instance={'vaults': vaults,
                                                           'cards': cards},
                                                 context={'request': request})
                return Response(data=results.data)

            except Exception as e:
                raise CustomAPIException(exception=e)

        return Response(status=status.HTTP_400_BAD_REQUEST,
                        data={'detail': serializer.errors})
