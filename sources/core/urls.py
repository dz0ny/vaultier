from django.conf.urls import patterns, url

from core import views

urlpatterns = patterns('',

    #dev
    url(r'^dev/mail$', views.dev_mail, name='index'),


    url(r'^$', views.index, name='index')


)

