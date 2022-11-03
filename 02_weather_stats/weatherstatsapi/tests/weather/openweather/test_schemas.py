from pydantic import ValidationError

from weather.openweather.schemas import GetWeatherData


def test_get_weather_data(weather_data):
    try:
        GetWeatherData.parse_obj(weather_data)
    except ValidationError as err:
        assert None, err
