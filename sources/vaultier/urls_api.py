from django.conf.urls import patterns, url

from rest_framework import routers
from vaultier.api.auth import AuthView, LogoutView
from vaultier.api.card import CardViewSet
from vaultier.api.member import MemberViewSet
from vaultier.api.role import RoleViewSet
from vaultier.api.secret import SecretViewSet
from vaultier.api.test import TestAcl
from vaultier.api.user import UserViewSet
from vaultier.api.vault import VaultViewSet
from vaultier.api.workspace import WorkspaceViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
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
                        url(r'^auth/user$', UserViewSet.as_view(), name='auth-user'),
                        url(r'^auth/logout$', LogoutView.as_view(), name='auth-logout'),
)
