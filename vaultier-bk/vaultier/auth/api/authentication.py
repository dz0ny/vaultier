from rest_framework.authentication import BaseAuthentication

class Authenticator(object):

    @classmethod
    def verify(cls, public_key, content, date, signature):
        """
        :param public_key:
        :param content:
        :param date:
        :param signature:
        :return:
        """
        signature = b64decode(signature)
        key = RSA.importKey(public_key)
        h = SHA.new(content + str(date))
        verifier = PKCS1_v1_5.new(key)
        return verifier.verify(h, signature)

    @classmethod
    def sign(cls, private_key, content, timestamp):
        """
        This is not production code, it is used in tests only

        :param private_key:
        :param content:
        :param timestamp:
        :return:
        """
        key = RSA.importKey(private_key)
        h = SHA.new()
        h.update(content + str(timestamp))
        signer = PKCS1_v1_5.new(key)
        sig = signer.sign(h)
        return sig.encode('base64')

    @classmethod
    def _create_token(cls, user):
        """
        Create new authentication token for user

        :param user:
        :return: Token
        """
        return Token.objects.create(user=user)

    @classmethod
    def authenticate(cls, email=None, date=None, signature=None):

        date_parsed = dateparser.parse(date)
        safe_delta = timedelta(
            seconds=settings.VAULTIER.get('login_safe_timestamp'))
        safe_until = date_parsed + safe_delta
        now = timezone.now()

        if safe_until < now:
            # todo: this should raise something else than 400
            raise Exception('Login timestamp too old')

        #check database for user
        try:
            user = User.objects.get(email=email.lower())
        except User.DoesNotExist:
            return None

        # verify signature
        if cls.verify(user.public_key, email, date, signature):
            return cls._create_token(user)
        return None


class TokenAuthentication(BaseAuthentication):

    def authenticate(self, request):
        token = request.META.get('HTTP_X_VAULTIER_TOKEN')

        if token is None or token == '' or token == 'null':
            return None, None

        try:
            model = Token.objects.get(token=token)
            """:type : Token"""
            token_renewal_interval = settings.VAULTIER.get(
                'authentication_token_renewal_interval')
            #convert to seconds
            token_renewal_interval *= 60

            td = timezone.now() - model.last_used_at
            if td.total_seconds() > token_renewal_interval:
                model.last_used_at = timezone.now()
                model.save()
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        if not model.user.is_active:
            raise AuthenticationFailed('User inactive or deleted')

        return model.user, token


