from django.contrib.auth import authenticate, login, logout
from rest_framework.fields import EmailField, CharField
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin
from rest_framework.views import APIView
from core.api import ApiException
from core.auth.backend import HandshakeCoder
from rest_framework.response import Response
from rest_framework import serializers
from core.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'nickname','public_key' ]

class UserView(CreateModelMixin, UpdateModelMixin,  GenericAPIView ):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class StatusView(APIView):
    def status(self, request):
        user = request.user
        if (user.is_authenticated()):
            serialized = UserSerializer(user).data;
            return Response(serialized)
        else:
            return Response({'result': False})

    def get(self, request):
        return self.status(request)


class AuthSerializer(serializers.Serializer):
    email = EmailField(required=True)
    password = CharField(required=True, min_length=32, max_length=32)


class AuthView(APIView):
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                user = authenticate(username=serializer.data.get('email'),
                                    password=serializer.data.get('password'),
                                    session=request.session)
                if user:
                    login(request, user)
                    serialized = UserSerializer(user).data;
                    return Response(serialized)
                else:
                    return Response({'result': False})
            except Exception as e:
                raise ApiException(exception=e)

        raise ApiException(detail=serializer.errors)

    def post(self, request):
        return self.auth(request)


class LogoutView(APIView):
    def logout(self, request):
        try:
            logout(request)
            response = Response({'result': True})
            response.delete_cookie('sessionid', '/', '.' )
            return response
        except Exception as e:
            raise ApiException(exception=e)

    def post(self, request):
        return self.logout(request)



class HandshakeSerializer(serializers.Serializer):
    email = EmailField(required=True)


class HandshakeView(APIView):
    def handshake(self, request):
        serializer = HandshakeSerializer(data=request.DATA)
        if serializer.is_valid():
            # try:
                d = HandshakeCoder()
                hs = d.handshake(serializer.data.get('email'), request.session)
                return Response(hs)
            # except Exception as e:
            #     raise ApiException(exception=e)

        raise ApiException(detail=serializer.errors)

    def post(self, request):
        return self.handshake(request)

