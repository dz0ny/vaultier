from rest_framework.viewsets import GenericViewSet


class RestfulGenericViewSet(GenericViewSet):
    """
    Adding option to filter allowed methods on ViewSet
    """

    def initial(self, request, *args, **kwargs):
        """
        Call check_method if present and returns parent
        """
        if hasattr(self, 'filter_method'):
            self.filter_method(request)

        return super(GenericViewSet, self).initial(request, args, kwargs)

    @property
    def allowed_methods(self):
        """
        Call _filter_allowed_methods if present on view with param
        allowed methods and returns results
        """
        ret = super(RestfulGenericViewSet, self).allowed_methods
        if hasattr(self, 'filter_allowed_methods'):
            ret = self.filter_allowed_methods(ret)
        return ret
