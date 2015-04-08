from django.conf.urls import patterns, url

from vaultier.base.api.config.views import ConfigView
from vaultier.base.api.servertime.views import ServerTimeView

urlpatterns = patterns('',
                       url(r'^servertime$', ServerTimeView.as_view(), name='servertime'),
                       url(r'^config$', ConfigView.as_view(), name='config'),
                       )