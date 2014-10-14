from rest_framework.response import Response
from rest_framework.views import APIView
from news.business.news_sucker import sucker
from news.serializers import NewsSerializer


class NewsApiView(APIView):
    """
    News api endpoint. Provides only list (GET) method
    """

    def get(self, request, *args, **kwargs):
        data = sucker.fetch()
        serializer = NewsSerializer(data, many=True)
        return Response(serializer.data)