from django.db.models.fields import EmailField
from rest_framework.serializers import ModelSerializer
from vaultier.auth.models.user.model import User


class UserSerializer(ModelSerializer):
    email = EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']

    def restore_fields(self, data, files):
        if self.context.get('view').action != 'create':
            self.fields.get('public_key').read_only = True
        return super(UserSerializer, self).restore_fields(data, files)

