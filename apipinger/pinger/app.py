import logging
from typing import Dict

from fastapi import FastAPI

from pinger import routers

app = FastAPI()


@app.get("/")
async def index():
    return {"msg": "Hello World"}


app.include_router(
    routers.router_v1,
    prefix="/api/v1",
    tags=["v1"],
)
