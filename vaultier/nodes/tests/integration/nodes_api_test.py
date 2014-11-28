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

    def test_list_children(self, user1, node1, node2):
        # node1 is parent of node2
        client = APIClient()
        client.force_authenticate(user=user1)

        urlparams = "?{}={}".format("parent", node1.id)
        response = client.get(reverse('node-list')+urlparams)

        assert response.status_code == status.HTTP_200_OK

        assert len(response.data) == 1

        assert response.data[0].get('id') == node2.id

    def test_detail(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.get(
            reverse('node-detail', kwargs={"pk": node1.id}))

        assert response.status_code == status.HTTP_200_OK

        response = client.get(
            reverse('node-detail', kwargs={"pk": 9999}))

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_path(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.get(
            reverse('node-path', kwargs={"pk": node1.id}))

        assert response.status_code == status.HTTP_200_OK

        response = client.get(
            reverse('node-path', kwargs={"pk": 9999}))

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_path_ordering(self, user1, node1, node2, node3):
        # node2 is parent of node1, node3 is parent of node2
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.get(
            reverse('node-path', kwargs={"pk": node1.id}))

        assert response.status_code == status.HTTP_200_OK

        assert len(response.data) == 2

        assert response.data[0].get('id') == node2.id
        assert response.data[1].get('id') == node3.id

    def test_data(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.get(
            reverse('node-data', kwargs={"pk": node1.id}))

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
                "name": "whatever",
                "meta": "different whatever",
                "type": Node.TYPE_DIRECTORY,
                "enc_version": 2,
            })

        assert response.status_code == status.HTTP_200_OK

        response = client.put(
            reverse('node-detail', kwargs={"pk": 9999}),
            data={
                "name": "whatever",
                "meta": "different whatever",
                "type": Node.TYPE_DIRECTORY,
                "enc_version": 2,
            })

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_data_update(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        with open("{}/{}".format(os.path.dirname(__file__), 'test.jpg')) as fl:
            response = client.patch(
                reverse('node-data', kwargs={"pk": node1.id}),
                data={
                    "blob_data": fl,
                    "blob_meta": "whatever"
                }, format='multipart')

            assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

            fl.seek(0)

            response = client.put(
                reverse('node-data', kwargs={"pk": node1.id}),
                data={
                    "blob_data": fl,
                    "blob_meta": "whatever"
                }, format='multipart')

            assert response.status_code == status.HTTP_200_OK

            fl.seek(0)

            response = client.put(
                reverse('node-data', kwargs={"pk": 9999}),
                data={
                    "blob_data": fl,
                    "blob_meta": "whatever"
                }, format='multipart')

            assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete(self, user1, node1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.delete(
            reverse('node-detail', kwargs={"pk": node1.id}))

        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_create(self, user1):
        client = APIClient()
        client.force_authenticate(user=user1)

        response = client.post(reverse('node-list'), data={})

        # not all required data provided
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        response = client.post(reverse('node-list'), data={
            "name": "whatever",
            "meta": "whatever",
            "type": Node.TYPE_DIRECTORY,
            "enc_version": 1,
        })

        assert response.status_code == status.HTTP_201_CREATED

        response = client.post(reverse('node-list'), data={
            "name": "whatever",
            "meta": "whatever",
            "type": Node.TYPE_FILE,
            "enc_version": 1,
        })

        # data not provided
        assert response.status_code == status.HTTP_201_CREATED

        response = client.post(
            reverse('node-list'), format='multipart', data={
                "name": "whatever",
                "meta": "whatever",
                "type": Node.TYPE_FILE,
                "enc_version": 1,
                "data": "whatever"
            })

        assert response.status_code == status.HTTP_201_CREATED
        created_node = response.data.get('id')

        response = client.post(reverse('node-list'), data={
            "name": "whatever",
            "meta": "whatever",
            "type": Node.TYPE_DIRECTORY,
            "enc_version": 1,
            "parent": created_node
        })

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data.get('parent') == created_node
