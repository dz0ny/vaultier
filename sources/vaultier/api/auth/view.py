import uuid
import hmac
from hashlib import sha1
from django.contrib.auth import authenticate, logout
from django.db.transaction import atomic
from rest_framework.fields import EmailField, CharField, SerializerMethodField
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from vaultier.api.exceptions import CustomAPIException
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import Token


class AuthSerializer(serializers.Serializer):
    email = EmailField(required=True)
    signature = CharField(required=True)
    digest = CharField(required=True)


class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ('token', 'user')


class DigestSerializer(serializers.Serializer):
    email = EmailField(required=True)
    digest = SerializerMethodField('generate_digest')

    def generate_digest(self, obj):
        unique = uuid.uuid4()
        return hmac.new(unique.bytes, digestmod=sha1).hexdigest()


class AuthView(APIView):

    @atomic
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                token = authenticate(email=serializer.data.get('email'),
                                    signature=serializer.data.get('signature'),
                                    digest=serializer.data.get('digest'))
                if token:
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


class DigestView(APIView):

    def post(self, request):
        serializer = DigestSerializer(data=request.DATA)
        if not serializer.is_valid():
            raise HTTP_400_BAD_REQUEST
        return Response(serializer.data)

