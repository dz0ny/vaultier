from django.db.transaction import atomic

class AtomicTransactionMixin(object):
    """
    Class encapsulate atomic transaction for rest_framework ViewSets
    """
    def __init__(self, *args, **kwargs):
        super(AtomicTransactionMixin, self).__init__(*args, **kwargs)
        setattr(self, 'dispatch', atomic(getattr(self, 'dispatch')))
