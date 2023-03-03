import argparse
import asyncio
import json
import time
from datetime import datetime

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
    for i in range(1000):
        start = time.time()

        print(f"{datetime.now()} Request: {i}")
        await asyncio.create_task(run_pinger())
        end = time.time()
        print('request {}, took {:.2f}s'.format(i, end - start))
        timestamps.append((start, end))

        sleep_time = 1.0
        diff = end - start
        if diff < sleep_time:
            await asyncio.sleep(sleep_time - diff)

    measurements = await get_measurements()

    results = []
    for (measurement, (start, end)) in zip(measurements, timestamps):
        measurement["start_timestamp"] = start
        measurement["end_timestamp"] = end
        results.append(measurement)

    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sends multiple API requests")
    parser.add_argument(
        "--sequential", default=False, help="Runs each requests after previous was finished. "
                                            "Without this argument there is no guarantee"
    )

    args = parser.parse_args()

    start_at = time.time()
    if args.sequential:
        asyncio.run(main_sequential())
    else:
        asyncio.run(main())

    print(f"test duration:{time.time() - start_at}")
