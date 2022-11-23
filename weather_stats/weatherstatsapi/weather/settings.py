from pydantic import BaseSettings


class AppSettings(BaseSettings):
    redis_host: str = "192.168.0.2"
    redis_port: int = 6379
    redis_password: str = ""
    redis_db: int = 0

    class Config:
        env_prefix = "APP_"
        env_file = ".api-env"
        env_file_encoding = "utf-8"


APP_SETTINGS = AppSettings()
