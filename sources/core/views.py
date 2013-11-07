from django.shortcuts import render
import hashlib

from rest_framework import status
from rest_framework import viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from core.serializers import VaultSerializer
from models import Vault, Workspace
from django.http import *
from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from django.core.validators import validate_email


# @login_required(login_url='/login/')
def index(request):
    return render(request, 'boostrap.html')
