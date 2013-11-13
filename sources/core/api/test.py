from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework.response import Response
from core.models.acl import Acl
from core.models.role import Role


class TestAcl(APIView):
    def get(self, request, format=None):
        role = Role.objects.get(pk=2)
        object = role.get_object()

        #materializer = OnObjectCreateMaterializer(role, object)
        #acls = materializer.materialize()

        for acl in acls:
            acl.save()

        #Acl.objects.bulk_create(acls)

        #saver = MaterializationSaver()
        #saver.save_materialized(acls)

        return Response(status=HTTP_200_OK)