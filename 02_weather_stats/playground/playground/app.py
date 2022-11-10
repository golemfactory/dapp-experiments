from typing import Dict

import redis

from fastapi import FastAPI

app = FastAPI()


def ping_redis() -> str:
    connection = redis.Redis()  # localhost:6379 no pw
    result = f"Ping successful: {connection.ping()}"
    connection.close()
    return result


@app.get("/")
def health_check() -> Dict[str, str]:
    try:
        return {"Ping": ping_redis()}
    except Exception as err:
        return {"Exception": f"{err}"}
