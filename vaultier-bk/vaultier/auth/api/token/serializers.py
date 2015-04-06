from rest_framework.fields import EmailField, CharField
from rest_framework.serializers import Serializer, ModelSerializer
from vaultier.auth.models.token.model import Token


class AuthSerializer(Serializer):

    email = EmailField(required=True, max_length=1024)
    signature = CharField(required=True, max_length=4096)
    servertime = CharField(required=True, max_length=256)


class TokenSerializer(ModelSerializer):

    class Meta:
        model = Token
        fields = ('token', 'user')



