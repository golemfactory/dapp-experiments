from typing import Dict

from fastapi import FastAPI

from weather.api.routes import weather_router
from weather.cache import RedisCache
from weather.openweather.client import OpenWeatherClient

app = FastAPI()


@app.get("/api")
async def health_check() -> Dict[str, str]:
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
