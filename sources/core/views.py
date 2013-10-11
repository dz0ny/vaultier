from django.shortcuts import render
import hashlib

from rest_framework import status
from rest_framework import viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from core.serializers import VaultSerializer, WorkspaceSerializer
from models import Vault, Workspace
from django.http import *
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from django.core.validators import validate_email

class VaultViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer



class AuthHandshakeView(APIView):

    def handshake(self, request):
        try:
            username = validate_email(request.POST.get('username', None) or request.GET.get('username', None));
            d = Digest()
            hs = d.handshake (username, request.session)
            return Response(hs)
        except Exception as e:
            r = Response({'detail': e}, status=status.HTTP_400_BAD_REQUEST)
            return r

    def post(self, request):
        return self.handshake(request)

    def get(self, request):
        return self.handshake(request)

class WorkspaceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer


def logout_user(request):
        logout(request)
        return HttpResponseRedirect(reverse('login'));

def login_user(request):
    a = request.session.get('a', 0)
    request.session['a']= a+1

    if request.POST:
        logout(request)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # todo: session is different for auth and anonymous, before login move to local variable after login refill session. Same for logout
    return render_to_response('login.html', {
        'a' : a,
        'authenticated': request.user.is_authenticated()
    },context_instance=RequestContext(request))


# @login_required(login_url='/login/')
def index(request):
    md5 = hashlib.md5()
    md5.update('jan.misek@rclick.cz');
    avatar = md5.hexdigest()
    return render(request, 'boostrap.html', {'avatar': avatar})
