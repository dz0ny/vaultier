from .models import Node
from .serializer import NodeSerializer
from .business.permissions import NodePermission
from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from vaultier.business.mixins import FullUpdateMixin, UpdateModelMixin
from vaultier.business.viewsets import RestfulGenericViewSet
from django.http.response import Http404


class NodeViewSet(RestfulGenericViewSet,
                  mixins.CreateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  FullUpdateMixin):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = (IsAuthenticated, NodePermission)

    def get_queryset(self):
        """
        Change queryset when parent URL param provided
        """
        parent = self.request.QUERY_PARAMS.get('parent')
        if parent and parent.isdigit():
            try:
                node = Node.objects.get(id=parent)
                return node.get_children()
            except Node.DoesNotExist:
                raise Http404("Node not found.")
        return super(NodeViewSet, self).get_queryset()

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
        Return data from Node (download)
        """
        #todo: this method
        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

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
