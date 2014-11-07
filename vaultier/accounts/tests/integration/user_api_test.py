from datetime import timedelta
from time import time

from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, \
    HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from django.utils import timezone
from rest_framework.test import APIClient
from django.core.urlresolvers import reverse
import pytest

from vaultier.test.tools import FileAccessMixin
from accounts.models import User
from accounts.business.authentication import Authenticator


@pytest.mark.django_db
class TestSignatures(object):
    def test_rsa(self):
        email = "ondrej.kmoch@rclick.cz"
        m = FileAccessMixin()
        privkey = m.read_file('vaultier.key')
        pubkey = m.read_file('vaultier.pub')

        signature = Authenticator.sign(privkey, email, 1)

        assert Authenticator.verify(pubkey, email, 1, signature) is True
        assert Authenticator.verify(pubkey, 'Unsigned text', 1, signature) is not True


@pytest.mark.django_db
class TestApiRegister(object):
    def public_key1(self):
        m = FileAccessMixin()
        return m.read_file('vaultier.pub')

    def private_key1(self):
        m = FileAccessMixin()
        return m.read_file('vaultier.key')

    def test_010_register(self):
        # register user
        client = APIClient()
        url = reverse('user-list')

        response = client.post(url, data={
            "nickname": "ondra",
            "email": "ondrej.kmoch@rclick.cz",
            "timestamp": int(time()),
            "public_key": self.public_key1(),
        })

        # test the response
        assert (response.data.get('id') is not None)
        id = response.data.get('id')
        assert (response.status_code == HTTP_201_CREATED)

        # test if user was created in database
        assert (User.objects.filter(id=id).exists())

        # register user again should be forbidden
        response = client.post(url, {
            "nickname": "ondra",
            "email": "ondrej.kmoch@rclick.cz",
            "timestamp": int(time()),
            "public_key": self.public_key1(),
        })

        assert (response.data.get('email') is not None)
        assert (response.status_code == HTTP_400_BAD_REQUEST)

    def test_020_auth(self, user1):
        email = user1.email
        date = timezone.now()
        good_signature = Authenticator.sign(self.private_key1(), email, date)
        bad_signature = "BadSignature"

        # try to login, check proper signature
        url = reverse('auth-auth')
        client = APIClient()
        response = client.post(url, {'email': email,
                                     'date': date,
                                     'signature': good_signature}
        )
        assert (response.status_code == HTTP_200_OK)

        # try to login, check wrong signature
        response = client.post(url, {'email': email,
                                     'date': date,
                                     'signature': bad_signature}
        )
        assert (response.status_code == HTTP_403_FORBIDDEN)

        # try to login, check wrong expired timestamp
        expired = timezone.now() - timedelta(days=15)
        response = client.post(url, {'email': email,
                                     'date': expired,
                                     'signature': bad_signature}
        )
        assert (response.status_code == HTTP_400_BAD_REQUEST)


    #  this does not work yet
    #  also - investigate if the registration REALLY should be insensitive

    # def test_030_registration_should_be_case_insensitive(self):
    #     # register user
    #     client = APIClient()
    #     date = timezone.now()
    #     email = 'TeSt.CaSe.InSeSiTiVe@rclick.cz'
    #     url = reverse('user-list')
    #
    #     response = client.post(url, {
    #         "nickname": "case_insensitive",
    #         "email": email,
    #         "timestamp": int(time()),
    #         "public_key": self.public_key1(),
    #     })
    #
    #     id = response.data.get('id')
    #     assert (response.status_code == HTTP_201_CREATED)
    #
    #     lower_case_signature = Authenticator.sign(self.private_key1().lower(), email, date)
    #     response = client.post(url, {'email': email.lower(),
    #                                  'date': date,
    #                                  'signature': lower_case_signature}
    #                            )
    #
    #     assert (response.status_code == HTTP_200_OK)
    #     assert (response.data.get('user') == id)
    #
    #     upper_case_signature = Authenticator.sign(self.private_key1(), email.upper(), date)
    #     response = client.post(url, {'email': email.lower(),
    #                                  'date': date,
    #                                  'signature': upper_case_signature}
    #     )
    # 
    #     assert (response.status_code == HTTP_200_OK)
    #     assert (response.data.get('user') == id)
    #
    #
    #     # register user
    #     email = 'TEST_UPPERCASE_REGISTRATION@rclick.cz'
    #     response = client.post(url, {
    #         "nickname": "UPPER_CASE_NICK",
    #         "email": email,
    #         "timestamp": int(time()),
    #         "public_key": self.public_key1(),
    #     })
    #     id = response.data.get('id')
    #     assert(response.status_code == HTTP_201_CREATED)
    #
    #     # login with the email to lower case
    #     lower_case_signature = Authenticator.sign(self.private_key1(), email.lower(), date)
    #     response = client.post(url, {'email': email.lower(),
    #                                  'date': date,
    #                                  'signature': lower_case_signature}
    #                            )
    #
    #     assert(response.status_code == HTTP_200_OK)
