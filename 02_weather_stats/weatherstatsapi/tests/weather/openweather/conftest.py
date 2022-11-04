import json
from pathlib import Path
from types import TracebackType
from typing import Any, Callable, Dict, List, Optional, Type
from unittest.mock import AsyncMock

import pytest


@pytest.fixture
def weather_data() -> Dict[str, Any]:
    with open(Path(__file__).parent / "weather_data.json") as f:
        data = json.load(f)
    return data


class MockResponse:

    _status: int
    _json: Dict

    def __init__(self, *args: List, **kwargs: Dict) -> None:
        return

    @property
    def status(self) -> int:
        return self._status

    async def json(self) -> Dict:
        return self._json

    async def __aenter__(self) -> "MockResponse":
        return self

    async def __aexit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc: Optional[BaseException],
        tb: Optional[TracebackType],
    ) -> None:
        pass


@pytest.fixture
def session_mock_factory() -> Callable[..., AsyncMock]:
    def _session_mock_factory(*, status: int, json: dict) -> AsyncMock:
        session = AsyncMock()
        response = MockResponse
        response._status = status
        response._json = json
        session.get = response
        return session

    return _session_mock_factory
