from django.conf.urls import patterns, include, url
from django.contrib import admin
from .views import index, config

admin.autodiscover()

urlpatterns = patterns('',

    url(r'^api/', include('vaultier.urls_api')),
    url(r'^config/config.js$', config, name='config'),

    url(r'^$', index, name='index')
    # Frontend
)
