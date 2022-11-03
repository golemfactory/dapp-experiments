import pytest

from weather.openweather.client import OpenWeatherClient
from weather.openweather.exceptions import OpenWeatherError
from weather.openweather.schemas import GetWeatherData


@pytest.mark.asyncio
async def test_get_weather_ok(weather_data, session_mock_factory):
    client = OpenWeatherClient()
    client._session = session_mock_factory(status=200, json=weather_data)
    received_weather = await client.get_weather(0, 0)
    assert received_weather == GetWeatherData.parse_obj(weather_data)


@pytest.mark.asyncio
async def test_get_weather_wrong_status(weather_data, session_mock_factory):
    client = OpenWeatherClient()
    client._session = session_mock_factory(status=500, json=weather_data)
    with pytest.raises(OpenWeatherError):
        await client.get_weather(0, 0)


@pytest.mark.asyncio
async def test_get_weather_wrong_response_body(session_mock_factory):
    client = OpenWeatherClient()
    client._session = session_mock_factory(status=500, json={})
    with pytest.raises(OpenWeatherError):
        await client.get_weather(0, 0)
