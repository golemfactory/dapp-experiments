# Weather Stats App

## Generating gvmi image hash

Use [gvmkit-build](https://golem-network.gitbook.io/golem-sdk-develop/requestor-tutorials/vm-runtime/convert-a-docker-image-into-a-golem-image) to generate a hash

```sh
docker compose build
gvmkit-build weather_stats-app:latest
gvmkit-build weather_stats-app:latest --push
```

## Running local docker instance

Replace [nginx](nginx.conf) proxy_pass configuration

```yml
proxy_pass http://api:5052/api;
```

Start docker container

```sh
docker compose up --build
```
