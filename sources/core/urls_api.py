from django.conf.urls import patterns, url

from rest_framework import routers
from core import views

def routing():
    router = routers.DefaultRouter()
    router.register(r'vaults', views.VaultViewSet)
    router.register(r'workspaces', views.WorkspaceViewSet)
    return router
