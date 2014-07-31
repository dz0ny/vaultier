import datetime
from app.settings import BK_FEATURES
from django.contrib.auth import authenticate, logout
from django.db.transaction import atomic
from rest_framework.fields import EmailField, CharField, IntegerField
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from vaultier.api.exceptions import CustomAPIException
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Token


class AuthSerializer(serializers.Serializer):
    email = EmailField(required=True)
    signature = CharField(required=True)
    js_timestamp = IntegerField(required=True)


class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ('token', 'user')


class AuthView(APIView):

    @atomic
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                js_timestamp = serializer.data.get('js_timestamp')
                time_difference = datetime.datetime.now() - datetime.datetime.fromtimestamp(js_timestamp / 1000.0)
                total_seconds = time_difference.total_seconds()
                token = authenticate(email=serializer.data.get('email'),
                                     js_timestamp=serializer.data.get('js_timestamp'),
                                     signature=serializer.data.get('signature'))
                if token and total_seconds < BK_FEATURES.get('login_safe_timestamp_delta'):
                    return Response(TokenSerializer(token).data)
                else:
                    return Response({'result': False}, status=HTTP_403_FORBIDDEN)
            except Exception as e:
                raise CustomAPIException(exception=e)

        raise CustomAPIException(detail=serializer.errors)

    def post(self, request):
        return self.auth(request)


class LogoutView(APIView):
    authentication_classes = (TokenAuthentication,)

    def logout(self, request):
        try:
            logout(request)
            response = Response({'result': True})
            response.delete_cookie('sessionid', '/', '.')
            return response
        except Exception as e:
            raise CustomAPIException(exception=e)

    @atomic
    def post(self, request):
        return self.logout(request)



