import asyncio
import json
import time

import aiohttp

PINGER_URL = "http://localhost:8080/api/v1"


async def run_pinger(session, idx):
    async with session.get(PINGER_URL) as response:
        status_code = response.status


async def get_measurements(session):
    async with session.get(f"{PINGER_URL}/measurements") as response:
        return await response.json()


async def main(*args, **kwargs):
    async with aiohttp.ClientSession() as session:
        tasks = []
        for idx in range(1000):
            tasks.append(asyncio.create_task(run_pinger(session, idx)))
            await asyncio.sleep(2)
        for task in tasks:
            await task
        measurements = await get_measurements(session)
    print(json.dumps(measurements, indent=2))


if __name__ == "__main__":
    start_at = time.time()
    asyncio.run(main())
    print(f"main:{time.time()-start_at}")
