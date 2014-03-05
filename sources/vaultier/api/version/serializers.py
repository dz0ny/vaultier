from django.contrib.contenttypes.models import ContentType
from rest_framework.fields import SerializerMethodField
from rest_framework.filters import DjangoFilterBackend
from rest_framework.serializers import ModelSerializer, Serializer
from vaultier.api.user.view import RelatedUserSerializer
from vaultier.models import Version


class VersionedSerializer(Serializer):
    read_only = True

    def to_native(self, obj):
        if obj:
            print
            return {
                'type': ContentType.objects.get_for_model(obj).model,
                'id': obj.id
            }
        return None


class VersionSerializer(ModelSerializer):
    versioned_related = VersionedSerializer()
    versioned = VersionedSerializer(read_only=True)
    created_by = RelatedUserSerializer()

    #revertable = SerializerMethodField('get_revertable')
    #diff = SerializerMethodField('get_diff')
    #
    #def get_revertable(self, obj):
    #    r = obj.get_handler().can_revert()
    #    return r
    #
    #def get_diff(self, obj):
    #    r = obj.get_handler().get_diff()
    #    return r


    class Meta:
        model = Version
        fields = (
            'id',
            #'revertable',
            #'diff',
            'versioned',
            'versioned_related',
            'revert_fields',
            'action_name',
            'action_id',
            'created_at',
            'updated_at',
            'created_by',
        )