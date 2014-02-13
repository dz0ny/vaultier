from django.forms.models import model_to_dict
from rest_framework.test import APIClient
import json
from app.settings_base import PROJECT_ROOT


class FileAccessMixin(object):

    def open_file(self, filename):
        file = open(PROJECT_ROOT+'/vaultier/test/fixtures/'+filename)
        return file

class AssertionsMixin(object):

    def assert_model(self, version, required):
        version = model_to_dict(version);
        return self.assert_dict(version, required)

    def assert_dict(self, compared, required):
        for key in required.keys():
            if not compared.has_key(key):
                raise self.failureException('Missing key "{key}"'.format(key=key))
            if compared[key] != required[key]:
                raise self.failureException('key "{key}" not same'.format(key=key))

def format_response(response):
    data = json.dumps(response.data, default=lambda obj: None)
    code = str(response.status_code)
    return 'code:' + code + ', json:' + data

class VaultierAPIClient(APIClient):

    def token(self, token):
        self.credentials(HTTP_X_VAULTIER_TOKEN=token)