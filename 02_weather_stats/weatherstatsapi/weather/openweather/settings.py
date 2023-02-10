from pydantic import BaseSettings
from yarl import URL


class OpenWeatherSettings(BaseSettings):
    base_url: URL = URL("http://api.openweathermap.org/data/2.5")
    appid: str = ""

    class Config:
        env_prefix = "OPEN_WEATHER_"
        env_file = ".api-env"
        env_file_encoding = "utf-8"


OPEN_WEATHER_SETTINGS = OpenWeatherSettings()
