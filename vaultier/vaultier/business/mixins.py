from django.db.transaction import atomic
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework import mixins
from rest_framework.exceptions import MethodNotAllowed


class AtomicTransactionMixin(object):
    """
    Class encapsulate atomic transaction for rest_framework ViewSets
    """
    def __init__(self, *args, **kwargs):
        super(AtomicTransactionMixin, self).__init__(*args, **kwargs)
        setattr(self, 'dispatch', atomic(getattr(self, 'dispatch')))


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


class UpdateModelMixin(mixins.UpdateModelMixin):
    """
    Mixin based from UpdateModelMixin but raising 404 error,
    when object not found
    """
    def get_object_or_none(self):
        """
        Removing different behaviour with 'put' method
        """
        return self.get_object()


class FullUpdateMixin(UpdateModelMixin):
    """
    Mixin based from UpdateModelMixin but supports PUT only
    """

    def filter_method(self, request):
        """
        Raise 405 whenever http method is patch
        """
        if request.method == "PATCH":
            raise MethodNotAllowed("PATCH")

    def filter_allowed_methods(self, methods):
        """
        Removes PATCH from allowed methods
        """
        try:
            methods.remove('PATCH')
        finally:
            return methods
