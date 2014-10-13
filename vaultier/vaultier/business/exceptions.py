from rest_framework.exceptions import APIException as BaseAPIException


class CustomAPIException(BaseAPIException):

    def __init__(self, exception=None, detail=None, status_code=None):
        self.detail = detail or 'Error occured'
        self.status_code = status_code or 400
        if exception:
            if isinstance(exception, self.__class__):
                self.detail = exception.detail
                self.status_code = status_code
                return
            if hasattr(exception, 'messages'):
                self.detail = map(str, exception.messages)
            else:
                self.detail = str(exception)
