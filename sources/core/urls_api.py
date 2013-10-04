from django.conf.urls import patterns, url

from rest_framework import routers
from core import views

def urls():
    router = routers.DefaultRouter()

    router.register(r'vaults', views.VaultViewSet)
    router.register(r'workspaces', views.WorkspaceViewSet)
    router.register(r'security', views.SecurityViewSet, base_name='security')

    urls = router.urls


    return urls;
