from typing import Dict

from fastapi import FastAPI

from weather.api.routes import weather_router

app = FastAPI()


@app.get("/")
async def health_check() -> Dict[str, str]:
    return {"Health Check": "Ok"}


app.include_router(
    weather_router,
    prefix="/v1/weather",
    tags=["weather"],
)
