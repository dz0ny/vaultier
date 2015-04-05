from rest_framework.test import APIClient
import json

class VaultierAPIClient(APIClient):

    def token(self, token):
        self.credentials(HTTP_X_VAULTIER_TOKEN=token)

def format_response(response):
    data = json.dumps(response.data, default=lambda obj: None)
    code = str(response.status_code)
    return 'code:' + code + ', json:' + data
