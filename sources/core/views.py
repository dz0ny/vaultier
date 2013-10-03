from django.shortcuts import render
import hashlib

from rest_framework import viewsets
from rest_framework import renderers
from rest_framework.response import Response
from core.serializers import VaultSerializer
from models import Vault


class CustomJSONRenderer(renderers.JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        return super(CustomJSONRenderer, self).render(data, accepted_media_type, renderer_context)


class VaultViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer

    def get(self, request, format=None):
        content = {'aaa': 'bbb'}
        return Response(content)


def index(request):
    md5 = hashlib.md5()
    md5.update('jan.misek@rclick.cz');
    avatar = md5.hexdigest()
    return render(request, 'vaults.html', {'avatar': avatar})
