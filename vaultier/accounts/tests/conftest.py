import pytest
from django import setup

from vaultier.test.tools import FileAccessMixin

from accounts.models import User


def pytest_configure():
    setup()


@pytest.fixture
def user1(db):
    m = FileAccessMixin()
    user = {
        "nickname": "ondra",
        "email": "ondrej.kmoch@rclick.cz",
        "public_key": m.read_file('vaultier.pub'),
    }
    return User.objects.create(**user)
