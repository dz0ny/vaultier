from itertools import imap
from rest_framework import serializers
from accounts.business.fields import RecoverTypeField
from accounts.models import Token, User, LostKey
from workspaces.business.fields import MemberStatusField
from workspaces.models import Member, Workspace


class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    signature = serializers.CharField(required=True)
    timestamp = serializers.IntegerField(required=True)


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('token', 'user')


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    def restore_fields(self, data, files):
        if (self.context.get('view').action != 'create'):
            self.fields.get('public_key').read_only = True
        return super(UserSerializer, self).restore_fields(data, files)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']


class RelatedUserSerializer(UserSerializer):

    read_only = True

    class Meta(UserSerializer.Meta):
        fields = ['id', 'nickname', 'email']


class MemberKeySerializer(serializers.ModelSerializer):
    def save_object(self, obj, **kwargs):
        return obj

    class Meta(UserSerializer.Meta):
        model = Member
        fields = ['id', 'workspace_key']


class UserKeySerializer(serializers.ModelSerializer):

    membership = MemberKeySerializer(many=True)

    def to_native(self, obj):
        obj.filtered_members = Member.objects.filter(
            user=self.object, status=MemberStatusField.STATUS_MEMBER)

        self.fields['membership'].source = 'filtered_members'
        return super(UserKeySerializer, self).to_native(obj)

    def validate_membership(self, attrs, source):
        all_modified = attrs.get('membership')

        all_existing = Member.objects.filter(
            user=self.object, status=MemberStatusField.STATUS_MEMBER
        )
        all_existing = list(all_existing)
        all_modified = list(all_modified)
        for exi in all_existing:
            found = False
            for mod in all_modified:
                if exi.id == mod.id:
                    found = True
                if mod.status != MemberStatusField.STATUS_MEMBER:
                    msg = 'Only members with STATUS_MEMBER could be updated'
                    raise serializers.ValidationError(msg)
            if not found:
                msg = 'All memberships keys has to be changed at once'
                raise serializers.ValidationError(msg)

        return attrs

    class Meta(UserSerializer.Meta):
        model = User
        fields = ['id', 'public_key', 'membership']
        depth = 1


class LostKeyCreateSerializer(serializers.Serializer):
    """
    Custom serializer for the post request
    """

    class Meta:
        fields = ('id', 'email')

    email = serializers.EmailField(required=True)
    id = serializers.IntegerField(read_only=True)

    def validate_email(self, attrs, source):
        """
        Check that the email belongs to a valid user
        set the attribute value to a valid user for latter use
        """
        try:
            attrs[source] = User.objects.get(email=attrs[source])
        except:
            raise serializers.ValidationError("Email not found")

        return attrs

    def save_object(self, obj, **kwargs):
        """
        Before save assign the user to the object
        """
        new_lostkey = LostKey(created_by=obj.get('email'))
        new_lostkey.save()
        obj['id'] = new_lostkey.id


class LostKeySerializer(serializers.ModelSerializer):
    """
    This serializer is used for all the LostKeyViewSet
    supported methods but POST
    """

    class Meta:
        model = LostKey
        fields = ('id', 'created_by', 'created_at', 'updated_at',
                  'expires_at', 'memberships', 'public_key', 'recover_type',)

    created_by = RelatedUserSerializer(read_only=True)
    expires_at = serializers.DateTimeField(read_only=True)
    hash = serializers.CharField(read_only=True)
    memberships = serializers.SerializerMethodField('get_memberships')
    public_key = serializers.CharField(max_length=1024, required=True,
                                       write_only=True)
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
        Retrieve all workspaces where user is a member.
        Returns an iterable of objects containing the name and id,
        plus a custom field is_recoverable for each workspace.
        A workspace is recoverable if it is share among any other user
        and its membership status is MemberStatusField.STATUS_MEMBER
        :return :dict {'workspace_id': int, 'workspace_name': str,
        'is_recoverable': bool}
        """
        workspaces = Workspace.objects.all_for_user(obj.created_by)
        return imap(lambda workspace:
                    {'workspace_id': workspace.id,
                     'workspace_name': workspace.name,
                     'is_recoverable':
                         LostKey.objects.find_workspace_is_recoverable(
                             workspace.id, obj.created_by)
                     }, workspaces)

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
