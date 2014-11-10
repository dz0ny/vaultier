"""
This file contains all package level database fixtures for test to use.
"""
import pytest
from nodes.models import Node

from accounts.tests.conftest import user1  # noqa


@pytest.fixture
def node1(db, user1):
    node = {
        "name": "they-call-me-document",
        "meta": "whatever",
        "type": Node.TYPE_DIRECTORY,
        "enc_version": 1,
        "created_by": user1,
    }
    return Node.objects.create(**node)
