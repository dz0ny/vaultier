from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
import iso8601


class ServerTimeView(APIView):
    """
    Returns the current server time in ISO 8601 format.

    The intention is for the client to be able to synchronize with the server
    time which has to be taken as the correct one for the purpose of request
    signing.
    """

    authentication_classes = ()

    def get(self, request):
        return Response({
            "datetime": iso8601.parse_date(datetime.utcnow().isoformat())
        })
