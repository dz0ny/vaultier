from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.template.context import Context
from django.conf import settings
import json
import pkg_resources
from rest_framework.views import APIView
from accounts.models import User


def index(request):

    return render(request, 'index.html', Context({
        'dev_shared_key': settings.VAULTIER.get('dev_shared_key'),
    }))


class ConfigView(APIView):
    """
    View to provide JS configuration
    """
    def get(self, request):
        """
        Get configuration from settings, format it and return
        """
        # get settings and transform it to json
        conf_settings = json.dumps({
            'VERSION': pkg_resources.get_distribution("Vaultier").version,
            'raven_key': settings.VAULTIER.get('raven_key'),
            'invitation_lifetime': settings.VAULTIER.get(
                'invitation_lifetime'),
            'registration_allow': settings.VAULTIER.get('registration_allow'),
            'registration_enforce': not bool(User.objects.all().count()),
            # dev
            'dev_shared_key': settings.VAULTIER.get('dev_shared_key'),
            'dev_show_token': settings.VAULTIER.get('dev_show_token'),
            'dev_email': settings.VAULTIER.get('dev_email')
        })
        # add settings to script
        script = 'InitializeConfig = function(app) { ' \
                 'app.Config = Ember.Object.extend(%s); }' % conf_settings

        return HttpResponse(script, content_type='text/javascript')


def error404(request):
    return redirect('/#'+request.path)

# def dev_mail(request):
#    context = build_context(Member.objects.filter(
#        status=MemberStatusField.STATUS_INVITED).reverse()[0])
#    plain, html = render_email('mailer/invitation', context)
#    return HttpResponse(html)
