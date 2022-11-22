from pydantic import BaseSettings
from yarl import URL


class OpenWeatherSettings(BaseSettings):
    base_url: URL = URL("https://api.openweathermap.org/data/2.5")
    appid: str = ""

    class Config:
        env_prefix = "OPEN_WEATHER_"


OPEN_WEATHER_SETTINGS = OpenWeatherSettings()
