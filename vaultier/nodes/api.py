from django.db.models.query_utils import Q
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from .models import Node, Policy
from nodes.business.permissions import PolicyPermission
from nodes.serializer import PolicySerializer
from .serializer import NodeSerializer, NodeBlobSerializer
from .business.permissions import NodePermission
from rest_framework import mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from vaultier.business.exceptions import CustomAPIException
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

    def initial(self, request, *args, **kwargs):
        """
        Find parent if any
        """
        parent_id = self.request.QUERY_PARAMS.get('parent')
        if parent_id and parent_id.isdigit():
            try:
                node = Node.objects.get(id=parent_id)
            except Node.DoesNotExist:
                raise Http404("Parent node was not found.")
            else:
                self.kwargs['parent'] = node
        return super(NodeViewSet, self).initial(request, *args, **kwargs)

    def get_queryset(self):
        """
        Change queryset when parent URL param provided
        """
        if self.action != "list":
            return Node.objects.all()

        parent = self.kwargs.get('parent')
        policy = Policy.objects.filter(principal=self.request.user, mask=Policy.mask.read)
        if not parent:
            return Node.objects.filter(level=0, _policies__in=policy).prefetch_related('_policies')

        return Node.objects.filter(parent=parent, _policies__in=policy).prefetch_related('_policies')

    def pre_save(self, obj):
        """
        In action 'create' assign creator
        """
        if self.action == "create":
            obj.created_by = self.request.user


class NodeDataView(GenericAPIView,
                   mixins.RetrieveModelMixin,
                   UpdateModelMixin):
    queryset = Node.objects.all()
    serializer_class = NodeBlobSerializer
    permission_classes = (IsAuthenticated, NodePermission)

    def get(self, request, pk):
        """
        Added get method
        """
        return self.retrieve(request, pk)

    def put(self, request, pk):
        """
        Added put method
        """
        response = self.update(request, pk)
        # if success, clear data from response
        if response.status_code == status.HTTP_200_OK:
            response.data = None
        return response


class NodePathView(GenericAPIView):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    permission_classes = (IsAuthenticated, NodePermission)

    def get(self, request, pk):
        """
        Return ordered list of path to all Node parents
        """
        node = self.get_object()
        nodes = node.get_ancestors(ascending=False)
        serializer = self.get_serializer(nodes, many=True)
        return Response(serializer.data)


class PolicyViewSet(ListModelMixin, UpdateModelMixin, RetrieveModelMixin,
                    RestfulGenericViewSet):
    model = Policy
    serializer_class = PolicySerializer
    permission_classes = (IsAuthenticated, NodePermission, PolicyPermission)

    def get_queryset(self):
        if 'node' in self.kwargs:
            return Policy.objects.filter(subject=self.kwargs['node'], role__isnull=False, mask__isnull=False)

        return Policy.objects.filter(subject__in=self.kwargs['parent_node'].get_ancestors(ascending=False, include_self=False), role__isnull=False, mask__isnull=False)

    def initial(self, request, *args, **kwargs):
        """
        Find parent if any
        """
        node_id = self.request.QUERY_PARAMS.get('node')
        parent_id = self.request.QUERY_PARAMS.get('parent_node')
        if node_id and node_id.isdigit():
            try:
                node = Node.objects.get(id=node_id)
            except Node.DoesNotExist:
                raise Http404("Parent node was not found.")
            else:
                self.kwargs['node'] = node
        elif parent_id and parent_id.isdigit():
            try:
                node = Node.objects.get(id=parent_id)
            except Node.DoesNotExist:
                raise Http404("Parent node was not found.")
            else:
                self.kwargs['parent_node'] = node
        else:
            detail = "node or node_parent query parameter is missing"
            raise CustomAPIException(status_code=400, detail=detail)
        return super(PolicyViewSet, self).initial(request, *args, **kwargs)

    def pre_save(self, obj):
        if self.action in ['create', 'update', 'partial_update']:
            obj.node = self.kwargs.get('node') or \
                       self.kwargs.get('parent_node')
