import pytest
from rest_framework.test import APIClient
from rest_framework.reverse import reverse
from rest_framework import status
from nodes.models import Node
import os


@pytest.mark.django_db
class TestNodesApi(object):
    def test_perm(self):
        client = APIClient()

        response = client.get(reverse('node-list'))

        # user not logged
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_list(self, user1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.get(reverse('node-list'))

        assert response.status_code == status.HTTP_200_OK

    def test_detail(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.get(
            reverse('node-detail', kwargs={"pk": node1.id}))

        assert response.status_code == status.HTTP_200_OK

    def test_update(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.patch(
            reverse('node-detail', kwargs={"pk": node1.id}),
            data={
                "meta": "different whatever",
                "enc_version": 2,
            })

        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

        response = client.put(
            reverse('node-detail', kwargs={"pk": node1.id}),
            data={
                "meta": "whatever",
                "type": Node.TYPE_DIRECTORY,
                "enc_version": 1,
            })

        assert response.status_code == status.HTTP_200_OK

    def test_delete(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.delete(
            reverse('node-detail', kwargs={"pk": node1.id}))

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_create(self, user1):
        client = APIClient()
        client.force_authenticate(user=user1)

        respone = client.post(reverse('node-list'), data={})

        # not all required data provided
        assert respone.status_code == status.HTTP_400_BAD_REQUEST

        respone = client.post(reverse('node-list'), data={
            "meta": "whatever",
            "type": Node.TYPE_DIRECTORY,
            "enc_version": 1,
        })

        assert respone.status_code == status.HTTP_201_CREATED

        respone = client.post(reverse('node-list'), data={
            "meta": "whatever",
            "type": Node.TYPE_FILE,
            "enc_version": 1,
        })

        # data not provided
        assert respone.status_code == status.HTTP_400_BAD_REQUEST

        with open("{}/{}".format(os.path.dirname(__file__), 'test.jpg')) as fl:
            respone = client.post(
                reverse('node-list'), format='multipart', data={
                    "meta": "whatever",
                    "type": Node.TYPE_FILE,
                    "enc_version": 1,
                    "data": fl
                })

        assert respone.status_code == status.HTTP_201_CREATED
