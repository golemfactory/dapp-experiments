from uuid import uuid4

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from pinger import pinger
from pinger.measurements import MEASUREMENTS

router_v1: APIRouter = APIRouter()


@router_v1.get("")
async def get_random():
    ping = await pinger.ping()
    ping["ping_id"] = uuid4()
    MEASUREMENTS.append(ping)
    return jsonable_encoder(ping)


@router_v1.get("/measurements")
async def get_measurements():
    return jsonable_encoder(MEASUREMENTS)
