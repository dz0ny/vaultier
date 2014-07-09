from django.conf.urls import patterns, url

from rest_framework import routers
from vaultier.api.auth.view import AuthView, LogoutView
from vaultier.api.card.view import CardViewSet
from vaultier.api.member.view import MemberViewSet
from vaultier.api.role.view import RoleViewSet
from vaultier.api.search.view import SearchView
from vaultier.api.secret.view import SecretViewSet
from vaultier.api.secret_blob.view import SecretBlobViewSet
from vaultier.api.user.view import UserViewSet
from vaultier.api.vault.view import VaultViewSet
from vaultier.api.workspace.view import WorkspaceViewSet
from vaultier.api.workspace_key.view import WorkspaceKeyViewSet
from vaultier.api.invitation.view import InvitationViewSet
from vaultier.api.lostkey.view import LostKeyViewSet
from vaultier.api.tree.view import TreeViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'workspaces', WorkspaceViewSet, base_name='workspace')
router.register(r'vaults', VaultViewSet, base_name='vault')
router.register(r'cards', CardViewSet, base_name='card')
router.register(r'secrets', SecretViewSet, base_name='secret')
router.register(r'secret_blobs', SecretBlobViewSet, base_name='secret_blob')
router.register(r'workspace_keys', WorkspaceKeyViewSet, base_name='workspace_key')
router.register(r'members', MemberViewSet, base_name='member')
router.register(r'invitations', InvitationViewSet, base_name='invitation')
router.register(r'roles', RoleViewSet, base_name='role')
router.register(r'lost_keys', LostKeyViewSet, base_name='lost_keys')
router.register(r'trees', TreeViewSet, base_name='trees')

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
