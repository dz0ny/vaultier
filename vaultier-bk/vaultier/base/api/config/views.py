from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings


class ConfigView(APIView):
    """
    Returns public configuration of vaultier.

    The intention is for the client to be able to ajdujst its behaviour
    based on server configuration
    """

    def get_client_configuration(self):
        return {
            'auth_registration_allow': settings.VAULTIER.get('auth_registration_allow')
        }

    def get(self, request):
        return Response(self.get_client_configuration())
