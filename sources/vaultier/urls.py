from django.conf.urls import patterns, include, url

from vaultier import settings
from core import urls_api,views

api_urls = urls_api.urls()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'vaultier.views.home', name='home'),
    # url(r'^vaultier/', include('vaultier.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:

    # url(r'^testing/$', views.SecurityViewSet.as_view()),

    url(r'^core/', include('core.urls')),
    url(r'^api/', include(api_urls)),
)

if settings.DEBUG :
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )