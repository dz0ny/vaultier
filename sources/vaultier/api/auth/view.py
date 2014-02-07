from django.contrib.auth import authenticate, logout
from rest_framework.fields import EmailField, CharField
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from vaultier.api import ApiException
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Token


class AuthSerializer(serializers.Serializer):
    email = EmailField(required=True)
    signature = CharField(required=True)

class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ('token','user')

class AuthView(APIView):
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                token = authenticate(email=serializer.data.get('email'),
                                    signature=serializer.data.get('signature'))
                if token:
                    return Response(TokenSerializer(token).data)
                else:
                    return Response({'result': False}, status=HTTP_403_FORBIDDEN)
            except Exception as e:
                raise ApiException(exception=e)

        raise ApiException(detail=serializer.errors)

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
            raise ApiException(exception=e)

    def post(self, request):
        return self.logout(request)

