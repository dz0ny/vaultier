from django.test import TestCase
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from vaultier.auth.tests.tool.users_api import create_user_api_call, public_key_fixture
from vaultier.base.utils.testtools.rest import response_to_message


class Test(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_should_create_user(self):

        data = {
            'email':'jany@rclick.cz',
            'public_key': public_key_fixture(),
            'nickname': 'jan'
        }

        response = create_user_api_call(**data)

        self.assertEqual(response.status_code, HTTP_201_CREATED, msg=''+response_to_message(response, 'should create user'))

        data['id'] = 1
        self.assertEqual(response.data, data, response_to_message(response, 'should return expected data'))

    def test_should_not_create_user_with_duplicate_email(self):

        response = create_user_api_call(
            email='jany@rclick.cz',
            public_key=public_key_fixture(),
            nickname='jan'
        )

        response = create_user_api_call(
            email='jany@rclick.cz',
            public_key=public_key_fixture(),
            nickname='jan'
        )
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST, msg=response_to_message(response, 'should not create same user twice'))

    def test_required_fields(self):

        response = create_user_api_call(
            email='',
            public_key=public_key_fixture(),
            nickname='jan'
        )

        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST, msg=response_to_message(response, 'email is required'))

        response = create_user_api_call(
            email='jany@rclick.cz',
            public_key='',
            nickname='jan'
        )

        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST, msg=response_to_message(response, 'public_key is required'))

        response = create_user_api_call(
            email='jany@rclick.cz',
            public_key=public_key_fixture(),
            nickname=''
        )

        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST, msg=response_to_message(response, 'nickname is required'))
