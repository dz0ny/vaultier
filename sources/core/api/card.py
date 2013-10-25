from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_401_UNAUTHORIZED, HTTP_402_PAYMENT_REQUIRED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet
from core.api.user import RelatedUserSerializer
from core.auth import TokenAuthentication
from core.models import Card


class CardSerializer(ModelSerializer):
    created_by = RelatedUserSerializer(required=False)

    class Meta:
        model = Card
        fields = ('id', 'name', 'description','vault', 'created_at', 'updated_at', 'created_by')


class CardViewSet(ModelViewSet):
    """
    API endpoint that allows workspaces to be viewed or edited.
    """
    model = Card
    # permission_classes = (IsAuthenticated,)
    serializer_class = CardSerializer
    authentication_classes = (TokenAuthentication,)

    def pre_save(self, object):
        if object.pk is None:
            object.created_by = self.request.user;
        return super(CardViewSet, self).pre_save(object)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Card.objects.filter(created_by=self.request.user)
        return queryset
    
