from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.conf import settings
import json
import os
import pkg_resources
from rest_framework.views import APIView
from accounts.models import User
from django.views import static

def index(request):
    """
    For devel purposes we need also index.html of frontend to be executed
    """
    index =  os.path.join(settings.VAULTIER['frontend_path'], 'html/index.html')
    return static.serve(request, index,document_root='/')


class ConfigView(APIView):
    """
    View to provide JS configuration
    """
    def get(self, request):
        """
        Get configuration from settings, format it and return
        """
        # get settings and transform it to json
        config = json.dumps({
            'VERSION': pkg_resources.get_distribution("Vaultier").version,
            'raven_key': settings.VAULTIER.get('raven_key'),
            'invitation_lifetime': settings.VAULTIER.get(
                'invitation_lifetime'),
            'registration_allow': settings.VAULTIER.get('registration_allow'),
            'registration_enforce': not bool(User.objects.all().count()),
            # dev
            'dev_shared_key': settings.VAULTIER.get('dev_shared_key'),
            'dev_shared_key_private': settings.VAULTIER.get('dev_shared_key_private'),
            'dev_shared_key_public': settings.VAULTIER.get('dev_shared_key_public'),
            'dev_show_token': settings.VAULTIER.get('dev_show_token'),
            'dev_email': settings.VAULTIER.get('dev_email')
        })

        return HttpResponse(config, content_type='application/json')


def error404(request):
    return redirect('/#'+request.path)

# def dev_mail(request):
#    context = build_context(Member.objects.filter(
#        status=MemberStatusField.STATUS_INVITED).reverse()[0])
#    plain, html = render_email('mailer/invitation', context)
#    return HttpResponse(html)
