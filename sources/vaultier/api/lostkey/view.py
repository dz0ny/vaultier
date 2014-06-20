from django.utils.datetime_safe import datetime
from django.utils.timezone import utc
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.fields import DateTimeField, CharField, EmailField, IntegerField
from rest_framework.serializers import ModelSerializer, Serializer, ValidationError
from vaultier.api.transactionmixin import AtomicTransactionMixin
from vaultier.api.user.view import RelatedUserSerializer
from vaultier.models.lostkey.fields import RecoverTypeField
from vaultier.models.lostkey.model import LostKey
from rest_framework import viewsets, mixins
from rest_framework.fields import SerializerMethodField
from vaultier.models.user.model import User
from vaultier.models.workspace.model import Workspace

CREATE_END_POINT = 'create'
UPDATE_METHODS = ('PUT', 'PATCH',)


class LostKeyCreateSerializer(Serializer):
    """
    Custom serializer for the post request
    """

    class Meta:
        fields = ('id', 'email')

    email = EmailField(required=True)
    id = IntegerField(read_only=True)

    def validate_email(self, attrs, source):
        """
        Check that the email belongs to a valid user
        set the attribute value to a valid user for latter use
        """
        try:
            attrs[source] = User.objects.get(email=attrs[source])
        except:
            raise ValidationError("Email not found")

        return attrs

    def save_object(self, obj, **kwargs):
        """
        Before save assign the user to the object
        """
        new_lostkey = LostKey(created_by=obj.get('email'))
        new_lostkey.save()
        obj['id'] = new_lostkey.id


class LostKeySerializer(ModelSerializer):
    """
    This serializer is used for all the LostKeyViewSet supported methods but POST
    """

    class Meta:
        model = LostKey
        fields = ('id', 'created_by', 'created_at', 'updated_at',
                  'expires_at', 'memberships', 'public_key', 'recover_type',)

    created_by = RelatedUserSerializer(read_only=True)
    expires_at = DateTimeField(read_only=True)
    hash = CharField(read_only=True)
    memberships = SerializerMethodField('get_memberships')
    public_key = CharField(max_length=1024, required=True, write_only=True)
    recover_type = RecoverTypeField(required=True, write_only=True)

    def restore_object(self, attrs, instance=None):
        """
        Remove attributes that not belongs to the model before assignment
        """
        public_key = attrs.pop('public_key', None)
        recover_type = attrs.pop('recover_type')
        obj = super(LostKeySerializer, self).restore_object(attrs, instance)
        obj.public_key = public_key
        obj.recover_type = recover_type
        return obj

    def get_memberships(self, obj):
        """
        Retrieve all workspaces where user is a member
        :return :dict {'workspace_name': string, 'is_recoverable': boolean}
        """
        workspaces = Workspace.objects.get_workspaces_with_recoverable_info(obj.created_by)

        return [{'workspace_name': record.name,
                 'is_recoverable': record.is_recoverable > 1}
                for record in workspaces]


    def save_object(self, obj, **kwargs):
        """
        Bind current authorised user to created_by field before saving
        """
        recovery_type = obj.recover_type

        if recovery_type == RecoverTypeField.DISABLE:
            LostKey.objects.disable_lost_key(obj.created_by)
            obj.created_by.public_key = ''
        elif recovery_type == RecoverTypeField.REBUILD:
            LostKey.objects.rebuild_lost_key(obj.created_by)
            obj.created_by.public_key = obj.public_key
        else:
            raise Exception('Unsupported recovery type')
        obj.used = True
        obj.created_by.save()

        super(LostKeySerializer, self).save_object(obj, **kwargs)


class LostKeyPermission(BasePermission):
    """
    Custom permission class based on view
    """
    allowed_not_auth_views = (CREATE_END_POINT,)

    def has_object_permission(self, request, view, obj):
        if view.action == CREATE_END_POINT:
            return True
        else:
            return isinstance(request.user, User)

    def has_permission(self, request, view):
        if view.action == CREATE_END_POINT:
            return True
        else:
            return isinstance(request.user, User)


class HashAuthentication(BaseAuthentication):
    """
    Custom authentication for lostKey api
    """

    def authenticate(self, request, **kwargs):
        """
        Validates a lost_key request by hash, id, and expiration time
        """
        user_hash = request.QUERY_PARAMS.get('hash', None)
        if user_hash == None:
            user_hash = request.DATA.get('hash')

        lost_key_id = request.parser_context.get('view').kwargs.get('pk')
        try:
            lost_key = LostKey.objects.get(hash=user_hash,
                                           pk=lost_key_id,
                                           expires_at__gte=datetime.utcnow().replace(tzinfo=utc),
                                           used=False)

            return lost_key.created_by, lost_key.hash
        except:
            return None


class LostKeyViewSet(AtomicTransactionMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    LostKey view points
    """
    model = LostKey
    serializer_class = LostKeySerializer
    permission_classes = (LostKeyPermission,)
    authentication_classes = (HashAuthentication,)

    def get_serializer_class(self):
        """
        Dynamically retrieve serializer based on request view
        :return: Serializer
        """
        if self.action == CREATE_END_POINT:
            return LostKeyCreateSerializer
        else:
            return LostKeySerializer
