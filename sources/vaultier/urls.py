from django.conf.urls import patterns, include, url

from vaultier import settings
from core import urls_api

router = urls_api.routing()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'vaultier.views.home', name='home'),
    # url(r'^vaultier/', include('vaultier.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^core/', include('core.urls')),
    url(r'^api/', include(router.urls)),
)

if settings.DEBUG :
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )