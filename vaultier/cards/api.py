from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from accounts.business.authentication import TokenAuthentication
from cards.business.permissions import CanManageCardPermission
from cards.models import Card
from cards.serializers import CardSerializer
from libs.version.context import VersionContextAwareApiViewMixin
from vaultier.business.mixins import AtomicTransactionMixin, \
    RetrieveBySlugMixin, SoftDeleteModelMixin


class CardViewSet(AtomicTransactionMixin,
                  RetrieveBySlugMixin,
                  SoftDeleteModelMixin,
                  VersionContextAwareApiViewMixin,
                  ModelViewSet):
    """
    API endpoint that allows cars to be viewed or edited.
    """
    model = Card
    serializer_class = CardSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, CanManageCardPermission)
    filter_fields = ('vault',)

    def pre_save(self, object):
        if object.pk is None:
            self.check_object_permissions(self.request, object)
            object.created_by = self.request.user
        return super(CardViewSet, self).pre_save(object)

    def get_queryset(self):
        if self.action == 'list':
            queryset = Card.objects.all_for_user(self.request.user)
        else:
            queryset = Card.objects.all()
        return queryset
