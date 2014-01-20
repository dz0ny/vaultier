from django.core.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.fields import EmailField
from rest_framework.permissions import BasePermission
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.status import HTTP_405_METHOD_NOT_ALLOWED, HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models import User
from vaultier.models.member import Member
from vaultier.models.member_fields import MemberStatusField


class CanManageUserPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        if request.user and request.user.is_authenticated():
            return True
        return False

    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.id == obj.id


class UserSerializer(ModelSerializer):
    email = EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'nickname', 'public_key']


class RelatedUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'nickname', 'email']


class MemberKeySerializer(ModelSerializer):

    def save_object(self, obj, **kwargs):
        return obj

    class Meta(UserSerializer.Meta):
        model = Member
        fields = ['id', 'workspace_key']


class UserKeySerializer(ModelSerializer):
    membership = MemberKeySerializer(many=True)

    def to_native(self, obj):
        obj.filtered_members = Member.objects.filter(user=self.object, status=MemberStatusField.STATUS_MEMBER);
        self.fields['membership'].source = 'filtered_members';
        return super(UserKeySerializer, self).to_native(obj)

    def save_object(self, obj, **kwargs):
        return obj

    def validate_membership(self, attrs, source):
        all_modified = attrs.get('membership');
        all_existing = Member.objects.filter(user=self.object, status=MemberStatusField.STATUS_MEMBER)
        all_existing = list(all_existing)
        all_modified = list(all_modified)
        for exi in all_existing:
            found = False
            for mod in all_modified:
                if (exi.id == mod.id):
                    found = True
                if mod.status != MemberStatusField.STATUS_MEMBER:
                    raise ValidationError('Only members with STATUS_MEMBER could be updated')
            if not found:
                raise ValidationError('All memberships keys has to be changed at once')

        return attrs

    class Meta(UserSerializer.Meta):
        model = User
        fields = ['id', 'public_key', 'membership']
        depth = 1



class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (CanManageUserPermission,)
    model = User

    @action(methods=['GET', 'PUT'])
    def key(self, request, pk=None):
        if (self.request.method == 'GET'):
            serializer = UserKeySerializer(instance=self.get_object())
            return Response(status=HTTP_200_OK, data=serializer.data)

        if (self.request.method == 'PUT'):
            object = self.get_object();
            serializer = UserKeySerializer(instance=object, data=request.DATA)
            if serializer.is_valid():
                serializer.save_object(object);
                return Response(status=HTTP_200_OK, data=serializer.data)
            else:
                return Response(status=HTTP_400_BAD_REQUEST, data=serializer.errors)

        return Response(status=HTTP_405_METHOD_NOT_ALLOWED, data={'Detail': 'Method not allowed'})