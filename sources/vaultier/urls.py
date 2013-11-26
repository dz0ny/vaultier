from django.conf.urls import patterns, url

from vaultier import views

urlpatterns = patterns('',

    #dev
    #url(r'^dev/mail$', views.dev_mail, name='index'),

    url(r'^config/config.js$', views.config, name='config'),

    url(r'^$', views.index, name='index')


)

