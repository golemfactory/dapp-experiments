from fastapi_utils.timing import record_timing
from starlette.requests import Request

from weather.cache import RedisCache
from weather.openweather.client import OpenWeatherClient
from weather.schemas import Location, Weather


async def get_from_location(
    latitude: float, longitude: float, request: Request
) -> Weather:
    weather = await RedisCache.get_weather_from_location(
        latitude=latitude, longitude=longitude
    )
    record_timing(request, note="RedisCache.get_weather_from_location")
    if weather is not None:
        return weather
    async with OpenWeatherClient() as weather_client:
        raw_weather = await weather_client.get_weather(latitude, longitude)
    weather = Weather(
        location=Location(
            lat=raw_weather.coord.lat,
            long=raw_weather.coord.lon,
            address=raw_weather.name,
        ),
        temperature=raw_weather.main.temp,
    )
    record_timing(request, note="OpenWeatherClient.get_weather")
    await RedisCache.set_weather_from_location(
        weather=weather, latitude=latitude, longitude=longitude
    )
    record_timing(request, note="RedisCache.set_weather_from_location")
    return weather
