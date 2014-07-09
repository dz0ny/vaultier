from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from vaultier.models.tree.model import Tree
from vaultier.models.workspace.model import Workspace

class TreeSerializer(ModelSerializer):

    #def __init__(self, instance=None, data=None, files=None, context=None, partial=False, many=None, allow_add_remove=False, **kwargs):
    #    return super(TreeSerializer, self).__init__(**kwargs)

    class Meta:
        model = Workspace
        fields = ('id', 'name',)


class TreeViewSet(ModelViewSet):
    """
    API endpoint that allows cars to be viewed or edited.
    """
    model = Workspace
    serializer_class = TreeSerializer

    #authentication_classes = (TokenAuthentication, )
    #permission_classes = (IsAuthenticated, CanManageCardPermission)
    #filter_fields = ('vault',)
    #
    #def pre_save(self, object):
    #    if object.pk is None:
    #        self.check_object_permissions(self.request, object)
    #        object.created_by = self.request.user
    #    return super(CardViewSet, self).pre_save(object)
    #
    def get_queryset(self):
        return Workspace.objects.filter(trees__lft__gt=0)



        #w_content_type = ContentType.objects.get(model='workspace')
        #v_content_type = ContentType.objects.get(model='vault')
        #c_content_type = ContentType.objects.get(model='card')
        #s_content_type = ContentType.objects.get(model='secret')
        #
        #for w in Workspace.objects.all():
        #    wt = Tree()
        #    wt.data_id = w.id
        #    wt.data_content_type = w_content_type
        #    wt.save()
        #    for v in Vault.objects.filter(workspace=w.id):
        #        vt = Tree()
        #        vt.parent = wt
        #        vt.data_id = v.id
        #        vt.data_content_type = v_content_type
        #        vt.save()
        #        for c in Card.objects.filter(vault=v.id):
        #            ct = Tree()
        #            ct.parent = vt
        #            ct.data_id = c.id
        #            ct.data_content_type = c_content_type
        #            ct.save()
        #            for s in Secret.objects.filter(card=c.id):
        #                st = Tree()
        #                st.parent = ct
        #                st.data_id = s.id
        #                st.data_content_type = s_content_type
        #                st.save()