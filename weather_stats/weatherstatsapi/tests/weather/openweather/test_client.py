from typing import Any, Callable, Dict
from unittest.mock import AsyncMock

import pytest

from weather.openweather.client import OpenWeatherClient
from weather.openweather.exceptions import OpenWeatherError
from weather.openweather.schemas import GetWeatherData


async def test_get_weather_ok(
    weather_data: Dict[str, Any], session_mock_factory: Callable[..., AsyncMock]
) -> None:
    client = OpenWeatherClient()
    client._OpenWeatherClient__session = session_mock_factory(status=200, json=weather_data)
    received_weather = await client.get_weather(0, 0)
    assert received_weather == GetWeatherData.parse_obj(weather_data)


async def test_get_weather_wrong_status(
    weather_data: Dict[str, Any], session_mock_factory: Callable[..., AsyncMock]
) -> None:
    client = OpenWeatherClient()
    client._OpenWeatherClient__session = session_mock_factory(status=500, json=weather_data)
    with pytest.raises(OpenWeatherError):
        await client.get_weather(0, 0)


async def test_get_weather_wrong_response_body(
    session_mock_factory: Callable[..., AsyncMock]
) -> None:
    client = OpenWeatherClient()
    client._OpenWeatherClient__session = session_mock_factory(status=500, json={})
    with pytest.raises(OpenWeatherError):
        await client.get_weather(0, 0)
