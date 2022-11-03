import json
from pathlib import Path
from unittest.mock import AsyncMock

import pytest


@pytest.fixture
def weather_data():
    with open(Path(__file__).parent / "weather_data.json") as f:
        data = json.load(f)
    return data


class MockResponse:

    _status: int
    _json: dict

    def __init__(self, *args, **kwargs):
        return

    @property
    def status(self):
        return self._status

    async def json(self):
        return self._json

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        pass


@pytest.fixture
def session_mock_factory():
    def _session_mock_factory(*, status: int, json: dict):
        session = AsyncMock()
        response = MockResponse
        response._status = status
        response._json = json
        session.get = response
        return session

    return _session_mock_factory
