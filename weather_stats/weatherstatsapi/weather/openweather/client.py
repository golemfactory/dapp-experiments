from types import TracebackType
from typing import Optional, Type

from aiohttp import ClientSession
from pydantic import ValidationError

from weather.openweather.exceptions import OpenWeatherError
from weather.openweather.schemas import GetWeatherData, GetWeatherParams
from weather.openweather.settings import OPEN_WEATHER_SETTINGS


class OpenWeatherClient:

    __session: ClientSession

    async def __aenter__(self) -> "OpenWeatherClient":
        self.__session = ClientSession()
        return self

    async def __aexit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc: Optional[BaseException],
        tb: Optional[TracebackType],
    ) -> None:
        await self.__session.close()

    @property
    def _session(self) -> ClientSession:
        try:
            return self.__session
        except AttributeError as err:
            raise OpenWeatherError(
                "Open Weather Client was not initialized correctly"
            ) from err

    async def head_status(self) -> int:
        async with self._session.get(
            OPEN_WEATHER_SETTINGS.base_url,
            params={"appid": OPEN_WEATHER_SETTINGS.appid},
        ) as response:
            return response.status

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
