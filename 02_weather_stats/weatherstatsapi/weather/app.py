from fastapi import FastAPI

from weather.api.routes import weather_router

app = FastAPI()
app.include_router(
    weather_router,
    prefix="/v1/weather",
    tags=["weather"],
)
