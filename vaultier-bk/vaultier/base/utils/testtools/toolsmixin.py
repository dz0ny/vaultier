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

