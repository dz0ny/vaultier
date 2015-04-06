from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'vaultier.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^api/', include('vaultier.auth.urls')),
]
