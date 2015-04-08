from django.forms.models import model_to_dict

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


