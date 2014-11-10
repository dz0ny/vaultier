from .models import Node
from .serializer import NodeSerializer
from .business.permissions import NodePermission
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from vaultier.business.mixins import FullUpdateMixin
from vaultier.business.viewsets import RestfulGenericViewSet


class NodeViewSet(RestfulGenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  FullUpdateMixin):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = (IsAuthenticated, NodePermission)

    def pre_save(self, obj):
        """
        In action 'create' assign creator
        """
        if self.action == "create":
            if not self.request.user:
                msg = "User have to be logged in at this point!"
                raise RuntimeError(msg)
            obj.created_by = self.request.user
