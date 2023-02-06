import logging
import os
from typing import Optional

import redis.asyncio as redis

from weather.schemas import Weather
from weather.settings import APP_SETTINGS

logger = logging.getLogger(os.path.basename(__file__))


class RedisCache:
    __client: Optional[redis.Redis] = None

    @classmethod
    async def __get_redis(cls) -> Optional[redis.Redis]:
        if cls.__client is not None:
            return cls.__client
        try:
            redis_client = await redis.Redis(
                host=APP_SETTINGS.redis_host,
                port=APP_SETTINGS.redis_port,
                db=APP_SETTINGS.redis_db,
                password=APP_SETTINGS.redis_password,
            )
            pong = await redis_client.ping()
            if pong:
                cls.__client = redis_client
        except redis.RedisError:
            logger.warning("Cannot connect to redis", exc_info=True)
        return cls.__client

    @classmethod
    def __location_to_key(cls, latitude: float, longitude: float) -> str:
        return f"weather.{latitude}.{longitude}"

    @classmethod
    async def is_connection_up(cls) -> bool:
        redis_client = await cls.__get_redis()
        return bool(redis_client)

    @classmethod
    async def get_weather_from_location(
        cls, latitude: float, longitude: float
    ) -> Optional[Weather]:
        redis_client = await cls.__get_redis()
        if redis_client is None:
            return None
        weather = await redis_client.get(cls.__location_to_key(latitude, longitude))
        if weather is None:
            return None
        return Weather.parse_raw(weather)

    @classmethod
    async def set_weather_from_location(
        cls, weather: Weather, latitude: float, longitude: float
    ) -> None:
        redis_client = await cls.__get_redis()
        if redis_client is None:
            return
        await redis_client.set(
            cls.__location_to_key(latitude, longitude), weather.json()
        )
