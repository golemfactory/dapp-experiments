from typing import List

from pydantic import BaseModel


class GetWeatherParams(BaseModel):
    lat: float
    lon: float
    units: str = "metric"


class GetWeatherData(BaseModel):
    class _Clouds(BaseModel):
        all: int

    class _Coord(BaseModel):

        lat: float
        lon: float

    class _Main(BaseModel):
        feels_like: float
        grnd_level: float
        humidity: float
        pressure: float
        sea_level: float
        temp: float
        temp_max: float
        temp_min: float

    class _Sys(BaseModel):
        country: str
        sunrise: int
        sunset: int

    class _Weather(BaseModel):
        description: str
        icon: str
        id: int
        main: str

    class _Wind(BaseModel):
        deg: int
        gust: float
        speed: float

    base: str
    clouds: _Clouds
    cod: int
    coord: _Coord
    dt: int
    main: _Main
    name: str
    sys: _Sys
    timezone: int
    visibility: int
    weather: List[_Weather]
    wind: _Wind
