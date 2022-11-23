# Weather Stats Api

## Generating gvmi image hash

Export dependencies

Add [OpenWeather](https://openweathermap.org/) api key to your `.api-env` file

```sh
poetry export --without-hashes --format=requirements.txt > requirements.txt
```

Use [gvmkit-build](https://golem-network.gitbook.io/golem-sdk-develop/requestor-tutorials/vm-runtime/convert-a-docker-image-into-a-golem-image) to generate a hash

```sh
docker compose build --no-cache
gvmkit-build weatherstatsapi-api:latest
gvmkit-build weatherstatsapi-api:latest --push
```

## Running linters and static code analysis

```sh
poetry run sh lint.sh
```

## Running tests

```sh
poetry run pytest
```

## Running local docker instance

Add [OpenWeather](https://openweathermap.org/) api key and docker redis variables to your `.env` file

```.env
OPEN_WEATHER_APPID=
APP_REDIS_HOST=cache
APP_REDIS_PORT=6379
APP_REDIS_PASSWORD=
```

Start docker container

```sh
docker compose up --build
```
