from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.viewsets import GenericViewSet
from vaultier.auth.api.token.serializers import TokenSerializer, AuthSerializer
from vaultier.auth.lib.authenticator import Authenticator, InvalidSignatureException, InvalidUserException, \
    CannotAuthenticateException, InvalidServerTimeException
from vaultier.auth.models.token.model import Token
from vaultier.base.utils.rest.atomictransaction import AtomicTransactionMixin


class TokenViewSet(AtomicTransactionMixin,
                   CreateModelMixin,
                   DestroyModelMixin,
                   GenericViewSet):
    serializer_class = TokenSerializer
    model = Token

    def create(self, request):
        try:
            serializer = AuthSerializer(data=request.DATA)
            serializer.is_valid(raise_exception=True)

            token = Authenticator.authenticate(
                email=serializer.data.get('email'),
                date=serializer.data.get('servertime'),
                signature=serializer.data.get('signature')
            )

            return Response(TokenSerializer(token).data, status=HTTP_201_CREATED)

        except (
                InvalidSignatureException,
                InvalidUserException,
                CannotAuthenticateException,
                InvalidServerTimeException,
                ValidationError
        ), e:
            # these exceptions are safe to pass their detail to user

            if (hasattr(e, 'message')):
                message = e.message;
            if (hasattr(e, 'detail')):
                message = e.detail;

            return Response({'result': False, 'detail': message, 'code': e.__class__.__name__},
                            status=HTTP_403_FORBIDDEN)

        except Exception, e:
            # these exceptions are not safe to pass their detail to user
            # @todo: these exception should be passed to sentry
            return Response({
                'result': False,
                'code': 'Exception',
                'message': 'Internal server error'
            }, status=HTTP_500_INTERNAL_SERVER_ERROR)


    def destroy(self, request, pk=None):
        pass

