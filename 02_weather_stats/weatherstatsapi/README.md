## Generating gvmi image hash

Export dependencies
```sh
poetry export --without-hashes --format=requirements.txt > requirements.txt
```
Use [gvmkit-build](https://golem-network.gitbook.io/golem-sdk-develop/requestor-tutorials/vm-runtime/convert-a-docker-image-into-a-golem-image) to generate a hash

## Running linters and static code analysis


```sh
poetry run sh lint.sh
```
