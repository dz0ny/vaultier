from rest_framework.test import APIClient
import json


class VaultierAPIClient(APIClient):
    def token(self, token):
        self.credentials(HTTP_X_VAULTIER_TOKEN=token)


def response_to_message(response, msg=None):
    data = json.dumps(response.data, default=lambda obj: None)
    code = str(response.status_code)
    if (msg):
        msg = 'message: ' + msg + ', ';
    else:
        msg = ''

    return msg + 'code:' + code + ', json:' + data
