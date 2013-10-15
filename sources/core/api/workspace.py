from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework.viewsets import ModelViewSet
from core.models import Workspace

class WorkspaceSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'url', 'created_at', 'updated_at')



class WorkspaceViewSet(ModelViewSet):
    """
    API endpoint that allows workspaces to be viewed or edited.
    """
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
