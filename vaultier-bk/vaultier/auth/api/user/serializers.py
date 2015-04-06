from rest_framework.fields import EmailField, BooleanField
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator
from vaultier.auth.models.user.model import User

class UserSerializer(ModelSerializer):
    is_superuser = BooleanField(read_only=True)
    email = EmailField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key', 'is_superuser']

    def restore_fields(self, data, files):
        if self.context.get('view').action != 'create':
            self.fields.get('public_key_fixture').read_only = True
        return super(UserSerializer, self).restore_fields(data, files)

