from .models import Node, Policy
from .serializer import NodeSerializer, NodeBlobSerializer
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
        # print policy
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
        descendants = node.get_descendants()
        serializer = self.get_serializer(descendants, many=True)
        return Response(serializer.data)
