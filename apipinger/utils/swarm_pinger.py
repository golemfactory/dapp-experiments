import asyncio
import json
import time

import aiohttp

PINGER_URL = "http://localhost:8080/api/v1"


async def run_pinger():
    async with aiohttp.ClientSession() as session:
        async with session.get(PINGER_URL) as response:
            status_code = response.status


async def get_measurements():
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{PINGER_URL}/measurements") as response:
            return await response.json()


async def main(*args, **kwargs):
    tasks = []
    for _ in range(1000):
        tasks.append(asyncio.create_task(run_pinger()))
        await asyncio.sleep(1)
    for task in tasks:
        await task
    measurements = await get_measurements()
    print(json.dumps(measurements, indent=2))

async def main_sequential(*args, **kwargs):
    timestamps = []
    for _ in range(1000):
        start = time.time()
        await asyncio.create_task(run_pinger())
        end = time.time()
        timestamps.append((start, end))

        diff = end - start
        if diff < 1:
            await asyncio.sleep(1 - diff)

    measurements = await get_measurements()

    results = []
    for (measurement, (start, end)) in zip(measurements, timestamps):
        measurement["start_timestamp"] = start
        measurement["end_timestamp"] = end
        results.append(measurement)

    print(json.dumps(measurements, indent=2))
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    start_at = time.time()
    asyncio.run(main_sequential())
    print(f"test duration:{time.time()-start_at}")
