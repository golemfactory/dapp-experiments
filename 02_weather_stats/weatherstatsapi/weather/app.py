from typing import Dict

from fastapi import FastAPI

from weather.api.routes import weather_router
from weather.weather import ping_redis

app = FastAPI()


@app.get("/api")
async def health_check() -> Dict[str, str]:
    try:
        return {"Health Check": await ping_redis()}
    except Exception as err:
        return {"Health Check": f"{err}"}


app.include_router(
    weather_router,
    prefix="/api/v1/weather",
    tags=["weather"],
)
