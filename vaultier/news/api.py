from rest_framework.response import Response
from rest_framework.views import APIView
from news.business.news_puller import puller
from news.serializers import NewsSerializer


class NewsApiView(APIView):
    """
    News api endpoint. Provides only list (GET) method
    """

    def get(self, request, *args, **kwargs):
        """
        Fetch data from NewsPuller service

        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        data = puller.fetch()
        serializer = NewsSerializer(data, many=True)
        return Response(serializer.data)
