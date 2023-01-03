import random
import time

import aiohttp

from pinger import utils
from pinger.apis import APIS

URL_FILLER = {
    "zip_code": utils.random_zip_code,
    "name": utils.random_name,
    "id": utils.random_id,
}


def get_random_api_url() -> str:
    key, raw_urls = random.choice(list(APIS.items()))
    raw_url = random.choice(raw_urls)

    return raw_url.format(**{key: URL_FILLER[key]()})


async def ping() -> dict:
    api_url = get_random_api_url()
    start_at = time.time()
    async with aiohttp.ClientSession() as session:
        async with session.get(api_url) as response:
            status_code = response.status
    end_at = time.time()
    result = {
        "status_code": status_code,
        "url": api_url,
        "request_time": end_at - start_at,
    }
    return result
