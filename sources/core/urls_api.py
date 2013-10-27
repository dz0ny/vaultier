from django.conf.urls import patterns, url

from rest_framework import routers
from core.api.auth import AuthView, LogoutView, UserView
from core.api.card import CardViewSet
from core.api.member import MemberViewSet
from core.api.role import RoleViewSet
from core.api.secret import SecretViewSet
from core.api.test import TestAcl
from core.api.vault import VaultViewSet
from core.api.workspace import WorkspaceViewSet


router = routers.DefaultRouter()
router.register(r'workspaces', WorkspaceViewSet)
router.register(r'vaults', VaultViewSet)
router.register(r'cards', CardViewSet)
router.register(r'secrets', SecretViewSet)
router.register(r'members', MemberViewSet)
router.register(r'roles', RoleViewSet)
urlpatterns = router.urls

urlpatterns += patterns('',
                        url(r'^test/acl$', TestAcl.as_view()),
                        url(r'^auth/auth$', AuthView.as_view(), name='auth-auth'),
                        url(r'^auth/user$', UserView.as_view(), name='auth-user'),
                        url(r'^auth/logout$', LogoutView.as_view(), name='auth-logout'),
)
