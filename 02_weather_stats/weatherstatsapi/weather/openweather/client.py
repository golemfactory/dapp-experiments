from aiohttp import ClientSession
from pydantic import ValidationError

from weather.openweather.exceptions import OpenWeatherError
from weather.openweather.schemas import GetWeatherData, GetWeatherParams
from weather.openweather.settings import OPEN_WEATHER_SETTINGS


class OpenWeatherClient:

    _session: ClientSession

    async def __aenter__(self):
        self._session = ClientSession()
        return self

    async def __aexit__(self, exc_type, exc, tb):
        await self._session.close()

    async def get_weather(self, latitude: float, longitude: float) -> GetWeatherData:
        params = GetWeatherParams(
            lon=longitude,
            lat=latitude,
        )
        async with self._session.get(
            OPEN_WEATHER_SETTINGS.base_url / "weather",
            params={**params.dict(), "appid": OPEN_WEATHER_SETTINGS.appid},
        ) as response:
            if response.status != 200:
                raise OpenWeatherError(
                    f"Wrong status code received from OpenWeather: {response.status}"
                )
            data = await response.json()
            try:
                return GetWeatherData(**data)
            except ValidationError as err:
                raise OpenWeatherError(
                    f"Error when validating weather data from OpenWeather: {err}"
                )
