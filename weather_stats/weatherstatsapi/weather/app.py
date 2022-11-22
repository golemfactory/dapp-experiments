from typing import Dict

from fastapi import FastAPI

from weather.api.routes import weather_router
from weather.cache import RedisCache

app = FastAPI()


@app.get("/api")
async def health_check() -> Dict[str, str]:
    try:
        return {
            "msg": "ok",
            "redis connection": f"{await RedisCache.is_connection_up()}",
        }
    except Exception as err:
        return {"msg": f"{err}"}


app.include_router(
    weather_router,
    prefix="/api/v1/weather",
    tags=["weather"],
)
