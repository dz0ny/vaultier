from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.template.context import Context
from django.conf import settings
import json
import pkg_resources
from rest_framework.views import APIView


def index(request):

    return render(request, 'index.html', Context({
        'FT_FEATURES': settings.FT_FEATURES,
        'BK_FEATURES': settings.BK_FEATURES
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
            'FT_FEATURES': settings.FT_FEATURES,
            'VERSION': pkg_resources.get_distribution("Vaultier").version,
            'invitation_lifetime': settings.VAULTIER.get(
                'invitation_lifetime'),
            'registration_allow': settings.VAULTIER.get('registration_allow')
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
