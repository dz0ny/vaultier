from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from vaultier.models import Version


class VersionSerializer(ModelSerializer):
    revertable = SerializerMethodField('get_revertable')
    diff = SerializerMethodField('get_diff')

    def get_revertable(self, obj):
        r = obj.get_handler().can_revert()
        return r

    def get_diff(self, obj):
        r = obj.get_handler().get_diff()
        return r


    class Meta:
        model = Version
        fields = ('id',
                  'revertable',
                  'diff',
                  'revert_fields',
                  'action_name',
                  'action_id',
                  'created_at',
                  'updated_at',)