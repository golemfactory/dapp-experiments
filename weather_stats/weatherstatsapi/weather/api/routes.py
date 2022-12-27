import logging
import os

from fastapi import APIRouter, HTTPException
from starlette.requests import Request

from weather import weather
from weather.openweather.exceptions import OpenWeatherError
from weather.schemas import Weather

logger = logging.getLogger(os.path.basename(__file__))

weather_router: APIRouter = APIRouter()


@weather_router.get("")
async def get_weather(
    request: Request,
    lat: float,
    long: float,
) -> Weather:
    try:
        return await weather.get_from_location(lat, long, request)
    except OpenWeatherError:
        logger.warning("OpenWeatherError when getting weather", exc_info=True)
        raise HTTPException(status_code=502, detail="Unable to obtain weather data.")
    except Exception as err:
        raise HTTPException(
            status_code=502,
            detail=f"Error when trying to get weather data: {err} {type(err)}",
        )
