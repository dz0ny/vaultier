from django.shortcuts import render
import hashlib

from rest_framework import viewsets
from rest_framework import renderers
from rest_framework.response import Response
from core.serializers import VaultSerializer, WorkspaceSerializer
from models import Vault, Workspace


class VaultViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer


class WorkspaceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer



def index(request):
    md5 = hashlib.md5()
    md5.update('jan.misek@rclick.cz');
    avatar = md5.hexdigest()
    return render(request, 'vaults.html', {'avatar': avatar})
