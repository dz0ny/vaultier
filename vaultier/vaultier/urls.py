from django.conf.urls import patterns, include, url
from django.contrib import admin
from .views import index, ConfigView, error404

admin.autodiscover()

handler404 = error404

urlpatterns = patterns(
    '',
    url(r'^api/', include('vaultier.urls_api')),
    url(r'^config/config.js$', ConfigView.as_view(), name='config'),

    url(r'^$', index, name='index')
    # Frontend
)
