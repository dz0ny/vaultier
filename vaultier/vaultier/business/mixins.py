from django.db.transaction import atomic
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT
from slugs.models import Slug


class AtomicTransactionMixin(object):
    """
    Class encapsulate atomic transaction for rest_framework ViewSets
    """
    def __init__(self, *args, **kwargs):
        super(AtomicTransactionMixin, self).__init__(*args, **kwargs)
        setattr(self, 'dispatch', atomic(getattr(self, 'dispatch')))


class RetrieveBySlugMixin(object):

    def get_object(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        numeric = pk.isnumeric()
        if not numeric:
            try:
                o = Slug.objects.get(slug=pk)
                self.kwargs['pk'] = o.object_id
            except:
                pass
        return super(RetrieveBySlugMixin, self).get_object(*args, **kwargs)


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
