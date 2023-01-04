# Api tests

APIs:

- "<https://api.jikan.moe/v4/anime/{id>}"
- "<https://api.genderize.io/?name={name>}"
- "<https://api.agify.io/?name={name>}"
- "<https://api.zippopotam.us/pl/{zip_code>}"

Errors are returned by all APIs, there is no patter that would suggest that only some APIs are causing this issue

## Take 1 03-01-2023 `imapp1019.h` provider

No delay between requests:

- 100 requests in ~120s: 31/69

1s delay between requests:

- 100 requests in ~213s 35/65

2s delay between requests:

- 1000 requests in 2117s: 346/654
- 1000 requests in ~2100s: 343/657

Responses resulted with 200: 755/2200 - **34.3181818%**

Response under 2s: **27.6818182%**

## Take 2 04-01-2023 `golem2004.h` provider

1s delay between requests:

- 1000 requests in ~1121s 345/655;
  49 requests resulted in 200 response after 60s;
  15 requests resulted in 200 response after more than 2s and less than 60s

Response under 2s: 281/655/49/15 - **28.1**
