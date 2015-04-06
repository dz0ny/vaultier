from rest_framework.views import APIView
from rest_framework.response import Response
from vaultier.auth.lib.authenticator import Authenticator


class ServerTimeView(APIView):
    """
    Returns the current server time in ISO 8601 format.

    The intention is for the client to be able to synchronize with the server
    time which has to be taken as the correct one for the purpose of request
    signing.
    """

    def get(self, request):
        return Response({
            "datetime": Authenticator.get_servertime()
        })
