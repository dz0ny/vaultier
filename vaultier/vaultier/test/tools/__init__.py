from django.forms.models import model_to_dict
from rest_framework.test import APIClient
import json
from django.conf import settings


class FileAccessMixin(object):

    def open_file(self, filename):
        file = open('{}/test/fixtures/{}'.format(
            settings.PROJECT_PATH, filename))
        return file

    def read_file(self, filename):
        file = self.open_file(filename)
        data = file.read()
        file.close()
        return data


class AssertionsMixin(object):

    def assert_model(self, version, required):
        version = model_to_dict(version)
        return self.assert_dict(version, required)

    def assert_dict(self, compared, required):
        for key in required.keys():
            if not key in compared:
                raise self.failureException('Missing key "{}"'.format(key))
            if compared[key] != required[key]:
                raise self.failureException('key "{}" not same'.format(key))


class VaultierAPIClient(APIClient):

    def token(self, token):
        self.credentials(HTTP_X_VAULTIER_TOKEN=token)


def format_response(response):
    data = json.dumps(response.data, default=lambda obj: None)
    code = str(response.status_code)
    return 'code:' + code + ', json:' + data
