from django.conf.urls import patterns, url

from rest_framework import routers
from vaultier.auth.api.servertime.views import ServerTimeView
from vaultier.auth.api.token.views import TokenViewSet
from vaultier.auth.api.user.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'tokens', TokenViewSet, base_name='token')

urlpatterns = router.urls

urlpatterns += patterns('',
                        url(r'^servertime$', ServerTimeView.as_view(), name='servertime'),
                        )