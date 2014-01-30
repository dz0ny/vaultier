from django.conf.urls import patterns, url

from rest_framework import routers
from vaultier.api.auth import AuthView, LogoutView
from vaultier.api.card import CardViewSet
from vaultier.api.member import MemberViewSet
from vaultier.api.role import RoleViewSet
from vaultier.api.search import SearchView
from vaultier.api.secret import SecretViewSet
from vaultier.api.secret_blob import SecretBlobViewSet
from vaultier.api.user import UserViewSet
from vaultier.api.vault import VaultViewSet
from vaultier.api.workspace import WorkspaceViewSet
from vaultier.api.workspace_key import WorkspaceKeyViewSet
from vaultier.api.invitation import InvitationViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'workspaces', WorkspaceViewSet,base_name='workspace')
router.register(r'vaults', VaultViewSet,base_name='vault')
router.register(r'cards', CardViewSet, base_name='card')
router.register(r'secrets', SecretViewSet, base_name='secret')
router.register(r'secret_blobs', SecretBlobViewSet, base_name='secret_blob')
router.register(r'workspace_keys', WorkspaceKeyViewSet, base_name='workspace_key')
router.register(r'members', MemberViewSet, base_name='member')
router.register(r'invitations', InvitationViewSet, base_name='invitation')
router.register(r'roles', RoleViewSet, base_name='role')

urlpatterns = router.urls

urlpatterns += patterns('',
                        # search
                        url(r'^search/search$', SearchView.as_view(), name='search-search'),
                        # auth
                        url(r'^auth/auth$', AuthView.as_view(), name='auth-auth'),
                        url(r'^auth/auth$', AuthView.as_view(), name='auth-auth'),
                        url(r'^auth/user$', UserViewSet.as_view(), name='auth-user'),
                        url(r'^auth/logout$', LogoutView.as_view(), name='auth-logout'),
)
