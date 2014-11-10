from .models import Node
from .serializer import NodeSerializer
from .business.permissions import NodePermission
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
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


class NodeDataView(GenericAPIView, UpdateModelMixin):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = (IsAuthenticated, NodePermission)

    def get(self, request, pk):
        """
        Return data from Node
        """
        node = self.get_object()
        data = {"data": node.data or None}
        return Response(data)

    def put(self, request, pk):
        """
        Added put method
        """
        return self.update(request, pk)


class NodePathView(GenericAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = (IsAuthenticated, NodePermission)

    def get(self, request, pk):
        """
        Return ordered list of path to all Node parents
        """
        node = self.get_object()
        descendants = node.get_descendants()
        serializer = self.get_serializer(descendants, many=True)
        return Response(serializer.data)
