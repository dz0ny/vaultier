from rest_framework.fields import EmailField, CharField
from rest_framework.mixins import DestroyModelMixin, CreateModelMixin
from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework.viewsets import GenericViewSet
from vaultier.auth.models.token.model import Token
from vaultier.base.utils.rest.atomictransaction import AtomicTransactionMixin



class AuthView(APIView):

    @atomic
    def auth(self, request):
        serializer = AuthSerializer(data=request.DATA)
        if serializer.is_valid():
            try:
                token = Authenticator.authenticate(
                    email=serializer.data.get('email'),
                    date=serializer.data.get('date'),
                    signature=serializer.data.get('signature')
                )

                if token:
                    return Response(TokenSerializer(token).data)
                else:
                    return Response({'result': False},
                                    status=status.HTTP_403_FORBIDDEN)
            except Exception as e:
                raise CustomAPIException(exception=e)

        raise CustomAPIException(detail=serializer.errors)

    def post(self, request):
        return self.auth(request)

