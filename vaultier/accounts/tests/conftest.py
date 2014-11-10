"""
This file contains all package level database fixtures for test to use.
"""
import pytest
from vaultier.test.tools import FileAccessMixin
from accounts.models import User


@pytest.fixture
def user1(db):
    user = {
        "nickname": "ondra",
        "email": "ondrej.kmoch@rclick.cz",
        "public_key": FileAccessMixin().read_file('vaultier.pub'),
    }
    return User.objects.create(**user)
