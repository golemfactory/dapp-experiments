from pydantic import BaseSettings


class AppSettings(BaseSettings):
    redis_host: str = "192.168.0.1"
    redis_port: int = 6379
    redis_password: str = "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81"
    redis_db: int = 0

    class Config:
        env_prefix = "APP_"


APP_SETTINGS = AppSettings()
