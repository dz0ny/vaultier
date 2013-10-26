from rest_framework.fields import SerializerMethodField, EmailField, BooleanField
from rest_framework.filters import SearchFilter, DjangoFilterBackend
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.viewsets import GenericViewSet
from core.auth import TokenAuthentication
from core.models.member import Member
from core.models.workspace import Workspace


class MemberSerializer(ModelSerializer):
    email = SerializerMethodField('get_email')
    nickname = SerializerMethodField('get_nickname')

    def get_email(self, obj):
        if obj:
            if (obj.status == 'i'):
                return obj.invitation_email
            else:
                return obj.user.email

    def get_nickname(self, obj):
        if obj:
            if (obj.status == 'i'):
                return obj.invitation_email
            else:
                return obj.user.nickname

    class Meta:
        model = Member
        fields = ('id', 'status', 'email', 'nickname', 'workspace', 'user', 'created_at', 'updated_at')


class RelatedMemberSerializer(MemberSerializer):
    pass


class MemberInviteSerializer(Serializer):
    email = EmailField(required=True)
    workspace = PrimaryKeyRelatedField(required=True, queryset=Workspace.objects.all())
    send = BooleanField(required=False, default=True)
    resend = BooleanField(required=False, default=True)


class MemberViewSet(CreateModelMixin,
                    ListModelMixin,
                    RetrieveModelMixin,
                    GenericViewSet):
    model = Member
    serializer_class = MemberSerializer
    authentication_classes = (TokenAuthentication,)
    filter_backends = (SearchFilter, DjangoFilterBackend)
    search_fields = ('invitation_email', 'user__email', 'user__nickname',)
    filter_fields = ('workspace',)

    def create(self, request, *args, **kwargs):
        serializer = MemberInviteSerializer(data=request.DATA)
        if serializer.is_valid():
            #todo: validate workspace id agaist object level permissions
            member = Member.objects.invite(
                user=request.user,
                workspace=serializer.object.get('workspace'),
                email=serializer.object.get('email'),
                send=serializer.object.get('send'),
                resend=serializer.object.get('resend')
            )

            return Response(
                MemberSerializer(member).data,
                status=HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def pre_save(self, object):
        if object.pk is None:
            object.created_by = self.request.user;
        return super(MemberViewSet, self).pre_save(object)

    def get_queryset(self):
        queryset = Member.objects.all()
        return queryset

