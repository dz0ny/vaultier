from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK

from rest_framework.status import HTTP_400_BAD_REQUEST
import pytest

from accounts.models import User, LostKey
from accounts.tests.testutils.test_api_utils import *


@pytest.mark.django_db
class TestApiLostKey(object):
    """
    Exercise the lost_key API
    """

    def test_should_not_create_resource_with_wrong_email(self):
        """
        Test create view with invalid email
        :return:
        """
        response = create_lost_keys_api_call(email="nonexistent@ema.il")
        assert (response.status_code == HTTP_400_BAD_REQUEST)

    def test_hash_should_be_unique(self, lostkey1, lostkey2):
        # retrieve first lost key resource
        lost_key_1 = LostKey.objects.get(pk=lostkey1.pk)
        # retrieve second lost key resource
        lost_key_2 = LostKey.objects.get(pk=lostkey2.pk)

        assert (lost_key_1.hash != lost_key_2.hash)


    def test_should_create_a_new_lostkey_resource(self, user1):
        """
        Exercise the creation of a lost key resource
        :return:
        """
        response = create_lost_keys_api_call(email=user1.email)
        assert (response.status_code == HTTP_201_CREATED)

        assert (response.data.get('email'), user1.email)
        # id should not be null
        assert (response.data.get('id') is not None)

    def test_should_not_retrieve_user_without_hash(self, lostkey1):
        """
        Check authentication base on hash
        :param
        :return:
        """
        # with proper hash
        response = retrieve_lost_key_api_call(lostkey1.pk,
                                              lostkey1.hash)
        assert (response.status_code == HTTP_200_OK)
        # without proper hash
        response = retrieve_lost_key_api_call(lostkey1.pk,
                                              '1nv4l1d_h4sh')
        assert (response.status_code == HTTP_403_FORBIDDEN)

    def test_should_not_update_user_without_hash(self, lostkey1):
        """
        Check authentication base on hash
        :return:
        """
        # update call update without hash
        response = update_lost_key_api_rebuild_call(lostkey1.pk,
                                                    '')
        assert (response.status_code, HTTP_403_FORBIDDEN)

    def test_should_update_the_user(self, lostkey1, user1):
        """
        Update a user public key
        :return:
        """
        new_public_key = 'AnOtHer PuBlIc KeY'

        response = update_lost_key_api_rebuild_call(lostkey1.id, lostkey1.hash,
                                                    public_key=new_public_key)

        fresh_select_user = User.objects.get(pk=user1.pk)
        fresh_select_lostkey = LostKey.objects.get(pk=lostkey1.pk)
        # The user has been updated
        assert (response.status_code == HTTP_200_OK)
        # The lost key row must be marked as used
        assert (fresh_select_lostkey.used) is True
        # The user public_key field must be updated
        assert (fresh_select_user.public_key == new_public_key)

    def test_cannot_use_lost_key_resource_twice(self, lostkey1):
        response = update_lost_key_api_rebuild_call(
            lostkey1.id, lostkey1.hash, 'Some changes on the public key'
        )
        # the resource was correctly updated
        assert (response.status_code, HTTP_200_OK)

        response = update_lost_key_api_rebuild_call(
            lostkey1.id, lostkey1.hash, 'Random changes on the public key'
        )
        # Once used the resource can not be used again
        assert (response.status_code == HTTP_403_FORBIDDEN)
