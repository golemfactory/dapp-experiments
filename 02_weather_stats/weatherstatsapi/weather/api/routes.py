import logging
import os

from fastapi import APIRouter, HTTPException

from weather import weather
from weather.openweather.exceptions import OpenWeatherError

logger = logging.getLogger(os.path.basename(__file__))

weather_router = APIRouter()


@weather_router.get("")
async def get_weather(lat: float, long: float):
    try:
        return await weather.get_from_location(lat, long)
    except OpenWeatherError:
        logger.warning("OpenWeatherError when getting weather", exc_info=True)
        raise HTTPException(status_code=502, detail="Unable to get weather")