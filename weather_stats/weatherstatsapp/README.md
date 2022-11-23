# Weather Stats App

## Generating gvmi image hash

Use [gvmkit-build](https://golem-network.gitbook.io/golem-sdk-develop/requestor-tutorials/vm-runtime/convert-a-docker-image-into-a-golem-image) to generate a hash

```sh
docker compose build --no-cache
gvmkit-build weatherstatsapp-app:latest
gvmkit-build weatherstatsapp-app:latest --push
```

## Running local docker instance

Create network

```sh
docker network create weather-stats
```

Replace [nginx](nginx.conf) proxy_pass configuration

```yml
proxy_pass http://api:5052/api;
```

Start docker container

```sh
docker compose up --build
```
