from pydantic import BaseModel


class Location(BaseModel):
    lat: float
    long: float
    address: str


class Weather(BaseModel):
    location: Location
    temperature: float
    temperature_unit: str = "celsius"
