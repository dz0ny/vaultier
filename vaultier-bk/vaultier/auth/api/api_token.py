from rest_framework.mixins import DestroyModelMixin, CreateModelMixin
from vaultier.auth.models.token.model import Token


class AuthSerializer(serializers.Serializer):

    email = serializers.EmailField(required=True)
    signature = serializers.CharField(required=True)
    date = serializers.CharField(required=True)


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('token', 'user')


class TokenViewSet(AtomicTransactionMixin,
                  CreateModelMixin,
                  DestroyModelMixin
                  GenericViewSet):

    serializer_class = TokenSerializer
    model = Token

    def create(self, request):
        pass


    def destroy(self, request, pk=None):
        pass




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

