from django.conf.urls import patterns, url

from rest_framework import routers
from accounts.api import UserViewSet, LostKeyViewSet, AuthView, MemberViewSet
from acls.api import RoleViewSet
from cards.api import CardViewSet
from news.api import NewsApiView
from search.api import SearchView
from secrets.api import SecretViewSet, SecretBlobViewSet
from vaults.api import VaultViewSet
from workspaces.api import WorkspaceViewSet, WorkspaceKeyViewSet, \
    InvitationViewSet
from vaultier.api import ServerTimeView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'workspaces', WorkspaceViewSet, base_name='workspace')
router.register(r'vaults', VaultViewSet, base_name='vault')
router.register(r'cards', CardViewSet, base_name='card')
router.register(r'secrets', SecretViewSet, base_name='secret')
router.register(r'secret_blobs', SecretBlobViewSet, base_name='secret_blob')
router.register(r'workspace_keys', WorkspaceKeyViewSet,
                base_name='workspace_key')
router.register(r'members', MemberViewSet, base_name='member')
router.register(r'invitations', InvitationViewSet, base_name='invitation')
router.register(r'roles', RoleViewSet, base_name='role')
router.register(r'lost_keys', LostKeyViewSet, base_name='lost_keys')

urlpatterns = router.urls

urlpatterns += patterns(
    '',
    # server time
    url(r'^server-time/$', ServerTimeView.as_view(),
        name='server_time'),
    # news
    url(r'^news/$', NewsApiView.as_view(), name='news-list'),
    # search
    url(r'^search/search$', SearchView.as_view(), name='search-search'),
    # auth
    url(r'^auth/auth$', AuthView.as_view(), name='auth-auth'),
    url(r'^auth/user$', UserViewSet.as_view(), name='auth-user'),
)
