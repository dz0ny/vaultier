from django.conf.urls import patterns, url

from rest_framework import routers
from accounts.api import UserViewSet, LostKeyViewSet, AuthView, MemberViewSet
from nodes.api import NodeViewSet, NodePathView, NodeDataView, PolicyViewSet
from news.api import NewsApiView
from search.api import SearchView
from vaultier.views import ConfigView
# todo: move
from workspaces.api import WorkspaceKeyViewSet, InvitationViewSet
from vaultier.api import ServerTimeView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'nodes', NodeViewSet, base_name='node')
router.register(r'workspace_keys', WorkspaceKeyViewSet,
                base_name='workspace_key')
router.register(r'members', MemberViewSet, base_name='member')
router.register(r'invitations', InvitationViewSet, base_name='invitation')
router.register(r'roles', PolicyViewSet, base_name='role')
router.register(r'lost_keys', LostKeyViewSet, base_name='lost_keys')

urlpatterns = router.urls

urlpatterns += patterns(
    '',
    url(r'^config/', ConfigView.as_view(), name='config'),
    # node path
    url(r'^nodes/(?P<pk>\d+)/path/$', NodePathView.as_view(),
        name='node-path'),
    # node data
    url(r'^nodes/(?P<pk>\d+)/data/$', NodeDataView.as_view(),
        name='node-data'),
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
