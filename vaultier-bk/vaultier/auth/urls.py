from django.conf.urls import patterns, url

from rest_framework import routers
from vaultier.auth.api.token.viewsets import TokenViewSet
from vaultier.auth.api.user.viewsets import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'tokens', TokenViewSet, base_name='token')

urlpatterns = router.urls

# urlpatterns += patterns('',
#                         # search
#                         url(r'^search/search$', SearchView.as_view(), name='search-search'),
#                         # auth
#                         url(r'^auth/auth$', AuthView.as_view(), name='auth-auth'),
#                         url(r'^auth/auth$', AuthView.as_view(), name='auth-auth'),
#                         url(r'^auth/user$', UserViewSet.as_view(), name='auth-user'),
#                         url(r'^auth/logout$', LogoutView.as_view(), name='auth-logout'),
# )