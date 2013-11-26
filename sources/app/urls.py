from django.conf.urls import patterns, include, url

from app import settings
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'app.views.home', name='home'),
    # url(r'^app/', include('app.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:

    # url(r'^testing/$', views.SecurityViewSet.as_view()),

    url(r'^api/', include('vaultier.urls_api')),
    url(r'^admin/', include(admin.site.urls)),

    # Frontend
    url(r'^', include('vaultier.urls')),
)

if settings.DEBUG :
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )