from django.conf.urls import patterns, url

from rest_framework import routers
from core import views
from core.api.auth import HandshakeView, AuthView, LogoutView, UserView
from core.api.workspace import WorkspaceViewSet


router = routers.DefaultRouter()
router.register(r'vaults', views.VaultViewSet)
router.register(r'workspaces', WorkspaceViewSet)
urlpatterns = router.urls

urlpatterns += patterns('',
                        url(r'^auth/handshake$', HandshakeView.as_view()),
                        url(r'^auth/auth$', AuthView.as_view()),
                        url(r'^auth/user$', UserView.as_view()),
                        url(r'^auth/logout$', LogoutView.as_view()),
)
