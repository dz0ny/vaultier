from django.conf.urls import patterns, url

from core import views

urlpatterns = patterns('',
    url(r'^login/$', views.login_user, name='login'),
    url(r'^logout/$', views.logout_user, name='logout'),
    url(r'^app', views.index, name='index')
)

