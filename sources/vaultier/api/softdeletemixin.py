from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT


class SoftDeleteModelMixin(object):
    """
    Destroy a model instance.
    """
    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        self.pre_delete(obj)
        obj.softdelete()
        self.post_delete(obj)
        return Response(status=HTTP_204_NO_CONTENT)