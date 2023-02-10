import logging
from typing import Dict

from fastapi import FastAPI
from fastapi_utils.timing import add_timing_middleware
from starlette.requests import Request

from weather.api.routes import weather_router
from weather.cache import RedisCache
from weather.openweather.client import OpenWeatherClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
add_timing_middleware(app, record=logger.info, prefix="app", exclude="untimed")


@app.get("/api")
async def health_check(request: Request) -> Dict[str, str]:
    try:
        async with OpenWeatherClient() as weather_client:
            open_weather_head_status = await weather_client.head_status()
        return {
            "msg": "ok",
            "redis connection": f"{await RedisCache.is_connection_up()}",
            "open weather api root status": f"{open_weather_head_status}",
        }
    except Exception as err:
        return {"msg": f"{err}"}


app.include_router(
    weather_router,
    prefix="/api/v1/weather",
    tags=["weather"],
)
