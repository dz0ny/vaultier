from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_401_UNAUTHORIZED, HTTP_402_PAYMENT_REQUIRED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet
from core.api.user import CreatedByUserSerializer
from core.models import Secret


class SecretSerializer(ModelSerializer):
    created_by = CreatedByUserSerializer(required=False)

    class Meta:
        model = Secret
        fields = ('id', 'type', 'data' ,'card', 'created_at', 'updated_at', 'created_by')


class SecretViewSet(ModelViewSet):
    """
    API endpoint that allows workspaces to be viewed or edited.
    """
    model = Secret
    # permission_classes = (IsAuthenticated,)
    serializer_class = SecretSerializer

    def pre_save(self, object):
        if object.pk is None:
            object.created_by = self.request.user;
        return super(SecretViewSet, self).pre_save(object)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Secret.objects.filter(created_by=self.request.user)
        return queryset