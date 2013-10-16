from django.conf.urls import patterns, url

from rest_framework import routers
from core.api.auth import HandshakeView, AuthView, LogoutView, UserView
from core.api.card import CardViewSet
from core.api.vault import VaultViewSet
from core.api.workspace import WorkspaceViewSet


router = routers.DefaultRouter()
router.register(r'workspaces', WorkspaceViewSet)
router.register(r'vaults', VaultViewSet)
router.register(r'cards', CardViewSet)
urlpatterns = router.urls

urlpatterns += patterns('',
                        url(r'^auth/handshake$', HandshakeView.as_view()),
                        url(r'^auth/auth$', AuthView.as_view()),
                        url(r'^auth/user$', UserView.as_view()),
                        url(r'^auth/logout$', LogoutView.as_view()),
)
