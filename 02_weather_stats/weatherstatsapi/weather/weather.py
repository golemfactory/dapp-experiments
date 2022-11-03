from weather.openweather.client import OpenWeatherClient
from weather.schemas import Location, Weather


async def get_from_location(latitude: float, longitude: float):
    async with OpenWeatherClient() as weather_client:
        weather = await weather_client.get_weather(latitude, longitude)

    return Weather(
        location=Location(
            lat=weather.coord.lat, long=weather.coord.lon, address=weather.name
        ),
        temperature=weather.main.temp,
    )
