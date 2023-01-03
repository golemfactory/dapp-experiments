import asyncio
import json

import aiohttp

PINGER_URL = "http://localhost:8080/api/v1"


async def run_pinger(session, idx):
    print(f"pinger-{idx}:hi")
    async with session.get(PINGER_URL) as response:
        status_code = response.status
    print(f"pinger-{idx}:bye")


async def get_measurements(session):
    async with session.get(f"{PINGER_URL}/measurements") as response:
        return await response.json()


async def main(*args, **kwargs):
    print("main:hi")
    async with aiohttp.ClientSession() as session:
        print("main:tasks")
        tasks = [asyncio.create_task(run_pinger(session, idx)) for idx in range(100)]
        for task in tasks:
            print("main:await")
            await task
        print("main:measurements")
        measurements = await get_measurements(session)
    print("main:json")
    print(json.dumps(measurements, indent=2))
    print("main:bye")


if __name__ == "__main__":
    asyncio.run(main())
