from rest_framework.fields import EmailField, CharField
from rest_framework.serializers import Serializer, ModelSerializer
from vaultier.auth.models.token.model import Token


class AuthSerializer(Serializer):

    email = EmailField(required=True)
    signature = CharField(required=True)
    date = CharField(required=True)


class TokenSerializer(ModelSerializer):

    class Meta:
        model = Token
        fields = ('token', 'user')



