from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.contrib import admin
from .views import index, config, error404

admin.autodiscover()

handler404 = error404

urlpatterns = patterns('',

    url(r'^api/', include('vaultier.urls_api')),
    url(r'^config/config.js$', config, name='config'),

    url(r'^$', index, name='index')
    # Frontend
)
# urlpatterns += staticfiles_urlpatterns()

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.STATIC_ROOT}),
    )