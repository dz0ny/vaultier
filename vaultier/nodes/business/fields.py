from rest_framework.fields import FileField, Field
from django.core.exceptions import ValidationError
from rest_framework.request import Request
from rest_framework.serializers import ModelSerializer
from nodes.models import Policy


class BlobDataField(FileField):
    """
    Field for Blob Data. Use in serializer
    """

    def to_native(self, value):
        """
        Read file (if we got file)
        """
        if value:
            return value.read()
        return None

    def from_native(self, data):
        """
        File upload
        """
        # in bytes
        max_size = 10 * 1024 * 1024  # 10 mb
        if not data:
            raise ValidationError('At least blob_data must be specified')

        if data and hasattr(data, 'size') and data.size > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        if data and not hasattr(data, 'size') and len(data) > max_size:
            raise ValidationError('Maximum blob size is 100K encrypted')

        try:
            data.read().decode('utf-8')
        except UnicodeDecodeError:
            raise ValidationError('Not valid data')

        return super(BlobDataField, self).from_native(data)


class RoleSerializer(ModelSerializer):

    def initialize(self, parent, field_name):
        """
        Check if request is set to root Serializer

        :param parent:
        :param field_name:
        :return:
        """
        super(RoleSerializer, self).initialize(parent, field_name)
        assert isinstance(self.context.get('request'), Request)

    def field_to_native(self, obj, field_name):
        """
        Return string representation of role for user in request

        :param obj:
        :param field_name:
        :return:
        """
        user = self.context.get('request').user
        policy = obj.acl.policy_for_principal(user)
        return policy.role

    def field_from_native(self, data, files, field_name, into):
        """
        Change role for given user

        :param data:
        :param files:
        :param field_name:
        :param into:
        :return:
        """
        user = self.context.get('request').user

        role = data[field_name]
        if role not in self.root.object.acl.get_role_names():
            raise ValidationError("Role {} does not exists".format(role))

        def get_policies():
            for policy in self.root.object._policies.all():
                if policy.principal == user:
                    policy.role = data[field_name]
                yield policy


        into[self.source or field_name] = get_policies()

    class Meta:
        model = Policy
