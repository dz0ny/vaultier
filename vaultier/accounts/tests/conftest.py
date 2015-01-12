import pytest
from django import setup

from vaultier.test.tools import FileAccessMixin
from accounts.models import User, LostKey


def pytest_configure():
    setup()


@pytest.fixture
def user1(db):
    m = FileAccessMixin()
    user = {
        "nickname": "duke",
        "email": "duke.nukem@example.com",
        "public_key": m.read_file('vaultier.pub'),
    }
    return User.objects.create(**user)


@pytest.fixture
def user2(db):
    m = FileAccessMixin()
    user = {
        "nickname": "blade",
        "email": "blade.nukem@example.com",
        "public_key": m.read_file('vaultier.pub'),
    }
    return User.objects.create(**user)


@pytest.fixture
def lostkey1(db, user1):
    user = {
        "created_by": user1
    }
    return LostKey.objects.create(**user)


@pytest.fixture
def lostkey2(db, user2):
    user = {
        "created_by": user2
    }
    return LostKey.objects.create(**user)


@pytest.fixture
def pubkey():
    m = FileAccessMixin()
    return m.read_file('vaultier.pub')


@pytest.fixture
def privkey():
    m = FileAccessMixin()
    return m.read_file('vaultier.key')
