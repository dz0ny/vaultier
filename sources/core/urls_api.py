from django.conf.urls import patterns, url

from rest_framework import routers
from core import views
from core.api.auth import HandshakeView, AuthView, StatusView, LogoutView, UserView


router = routers.DefaultRouter()
router.register(r'vaults', views.VaultViewSet)
router.register(r'workspaces', views.WorkspaceViewSet)
urlpatterns = router.urls

urlpatterns += patterns('',
                        url(r'^auth/handshake$', HandshakeView.as_view()),
                        url(r'^auth/auth$', AuthView.as_view()),
                        url(r'^auth/user$', UserView.as_view()),
                        url(r'^auth/status$', StatusView.as_view()),
                        url(r'^auth/logout$', LogoutView.as_view()),
)
