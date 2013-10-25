from rest_framework.fields import EmailField
from rest_framework.serializers import ModelSerializer
from core.models import User

class UserSerializer(ModelSerializer):
    email = EmailField(required=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']

class RelatedUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'nickname', 'email']
