import redis

from weather.openweather.client import OpenWeatherClient
from weather.schemas import Location, Weather
from weather.settings import APP_SETTINGS


async def ping_redis() -> str:
    connection = redis.Redis(
        host=APP_SETTINGS.redis_host,
        port=APP_SETTINGS.redis_port,
        db=APP_SETTINGS.redis_db,
        password=APP_SETTINGS.redis_password,
    )
    result = f"Ping successful: {connection.ping()}"
    connection.close()
    return result


async def get_from_location(latitude: float, longitude: float) -> Weather:
    async with OpenWeatherClient() as weather_client:
        weather = await weather_client.get_weather(latitude, longitude)

    return Weather(
        location=Location(
            lat=weather.coord.lat, long=weather.coord.lon, address=weather.name
        ),
        temperature=weather.main.temp,
    )
