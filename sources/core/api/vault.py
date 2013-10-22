from rest_framework.fields import IntegerField
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.viewsets import ModelViewSet
from core.api.user import CreatedByUserSerializer
from core.models import Vault


class VaultSerializer(ModelSerializer):
    created_by = CreatedByUserSerializer(required=False)

    class Meta:
        model = Vault
        fields = ('id', 'name', 'description','workspace', 'created_at', 'updated_at', 'created_by')


class VaultViewSet(ModelViewSet):
    """
    API endpoint that allows workspaces to be viewed or edited.
    """
    model = Vault
    permission_classes = (IsAuthenticated,)
    serializer_class = VaultSerializer

    # def retrieve(self, request, *args, **kwargs):
    #     return Response(status=HTTP_403_FORBIDDEN)

    def pre_save(self, object):
        if object.pk is None:
            object.created_by = self.request.user;
        return super(VaultViewSet, self).pre_save(object)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        # queryset = Vault.objects.filter(created_by=self.request.user)
        queryset = Vault.objects.all()
        return queryset