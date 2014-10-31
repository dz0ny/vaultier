from itertools import imap
from rest_framework import serializers
from accounts.business.fields import RecoverTypeField, MemberStatusField
from accounts.models import Token, User, LostKey, Member
from acls.models import Role
from workspaces.models import Workspace


class AuthSerializer(serializers.Serializer):

    email = serializers.EmailField(required=True)
    signature = serializers.CharField(required=True)
    date = serializers.CharField(required=True)


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('token', 'user')


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']

    def restore_fields(self, data, files):
        if self.context.get('view').action != 'create':
            self.fields.get('public_key').read_only = True
        return super(UserSerializer, self).restore_fields(data, files)


class RelatedUserSerializer(UserSerializer):

    read_only = True

    class Meta(UserSerializer.Meta):
        fields = ['id', 'nickname', 'email']


class MemberKeySerializer(serializers.ModelSerializer):

    class Meta(UserSerializer.Meta):
        model = Member
        fields = ['id', 'workspace_key']

    def save_object(self, obj, **kwargs):
        return obj


class UserKeySerializer(serializers.ModelSerializer):

    membership = MemberKeySerializer(many=True)

    class Meta(UserSerializer.Meta):
        model = User
        fields = ['id', 'public_key', 'membership']
        depth = 1

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


class LostKeyCreateSerializer(serializers.Serializer):
    """
    Custom serializer for the post request
    """

    email = serializers.EmailField(required=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        fields = ('id', 'email')

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

    created_by = RelatedUserSerializer(read_only=True)

    expires_at = serializers.DateTimeField(read_only=True)
    hash = serializers.CharField(read_only=True)
    memberships = serializers.SerializerMethodField('get_memberships')
    public_key = serializers.CharField(max_length=1024, required=True,
                                       write_only=True)
    recover_type = RecoverTypeField(required=True, write_only=True)

    class Meta:
        model = LostKey
        fields = ('id', 'created_by', 'created_at', 'updated_at',
                  'expires_at', 'memberships', 'public_key', 'recover_type',)

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
        return imap(
            lambda workspace:
            {'workspace_id': workspace.id, 'workspace_name': workspace.name,
             'is_recoverable': LostKey.objects.find_workspace_is_recoverable(
                 workspace.id, obj.created_by)},
            workspaces)

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


class MemberInviteSerializer(serializers.Serializer):

    email = serializers.EmailField(required=True)
    workspace = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Workspace.objects.all())
    send = serializers.BooleanField(required=False, default=True)
    resend = serializers.BooleanField(required=False, default=True)


class MemberResendSerializer(serializers.Serializer):
    resend = serializers.BooleanField(required=False, default=True)


class MemberSerializer(serializers.ModelSerializer):

    email = serializers.SerializerMethodField('get_email')
    nickname = serializers.SerializerMethodField('get_nickname')

    class Meta:
        model = Member
        fields = ('id', 'status', 'email', 'nickname', 'workspace', 'user',
                  'created_at', 'updated_at')

    def get_email(self, obj):
        if obj:
            if (obj.user):
                return obj.user.email
            else:
                return obj.invitation_email

    def get_nickname(self, obj):
        if obj:
            if (obj.user):
                return obj.user.nickname
            else:
                return obj.invitation_email


class RelatedMemberSerializer(MemberSerializer):
    pass


class MemberRoleSerializer(serializers.ModelSerializer):

    created_by = serializers.SerializerMethodField('get_created_by')
    to_type = serializers.SerializerMethodField('get_to_type')
    to_name = serializers.SerializerMethodField('get_to_name')

    def get_created_by(self, obj):
        return RelatedUserSerializer(instance=obj.created_by).data

    def get_to_type(self, obj):
        return obj.type

    def get_to_name(self, obj):
        return obj.get_object().name

    class Meta:
        model = Role
        fields = ('id', 'created_by', 'to_type', 'to_name')


class MemberWorkspaceKeySerializer(serializers.ModelSerializer):

    public_key = serializers.SerializerMethodField('get_public_key')
    status = serializers.IntegerField(read_only=True)

    class Meta:
        model = Member
        fields = ('id', 'public_key', 'workspace_key', 'status')

    def validate_workspace_key(self, attrs, source):
        return attrs

    def get_public_key(self, obj):
        return obj.user.public_key

    def save_object(self, obj, **kwargs):
        obj.status = MemberStatusField.STATUS_MEMBER
        return super(MemberWorkspaceKeySerializer, self).\
            save_object(obj, **kwargs)
