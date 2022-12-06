# Weather Stats

This application is showcasing how to use Golem Network with access to external services (not hosted on Golem) using outbound network connections.

![weather-stats-c4-lv2-containers](https://user-images.githubusercontent.com/11493087/203728884-3d506a1b-9f40-4c61-869d-207ef6061e1f.jpg)

The app itself is written as a regular web application, implemented as a set of Docker containers, without any up-front Golem context in mind.
The only Golem-specific files are:

- **`golem-config.yml`** defines the runtime-specific Golem config (yagna appkey, subnet, budget)
- **`golem-compose.yml`** defines the structure of the Golem application. It uses an encoded manifest file for one of the containers in order to enable outbound network access.
- **`golem-maifest.json`** the manifest file used to enable outbound network access. It needs to be encoded in order to be included in the application descriptor, and signed to enable network access to a specific external address. For more information see this [section](#running-api-with-golem-manifestjson)

## Setup

This section will walk through the steps required to run the already-built app on Golem.

### Install and run yagna daemon

To install the yagna daemon, run the following command:

```sh
curl -ksSf https://join.golem.network/as-requestor | YA_INSTALLER_CORE=v0.12.0 bash -
```

**Application doesn't work on daemon versions lower than v0.12.0**, so please make sure to run this command if you think
your daemon might be outdated (it's safe to run it multiple times, will abort if already installed)

To run the daemon itself, run the following command:

```sh
yagna service run
```

### Configure yagna daemon

To use the running daemon as a requestor, we need to obtain an application key. You can check if you have a key already created by calling

```sh
yagna app-key list
```

**If you don't have a key**, please run the following command to create a new one

```sh
yagna app-key create <key_name>
```

## Running

Having the above setup complete, run the application with the following command (substituting `<your_key>` with an actual key you've obtained in the previous section):

```sh
YAGNA_APPKEY=<your_key> dapp-runner start --config golem-config.yml golem-compose.yml
```

After running this command, besides debug logs, you should look for the following entries

```sh
Starting app: Weather Stats App

{"cache": {"0": "pending"}}
{"cache": {"0": "starting"}}
{"cache": {"0": "running"}}
{"cache": {"0": "running"}, "api": {"0": "pending"}}
{"cache": {"0": "running"}, "api": {"0": "starting"}}
{"cache": {"0": "running"}, "api": {"0": "running"}}
{"cache": {"0": "running"}, "api": {"0": "running"}, "app": {"0": "pending"}}
{"cache": {"0": "running"}, "api": {"0": "running"}, "app": {"0": "starting"}}
{"cache": {"0": "running"}, "api": {"0": "running"}, "app": {"0": "running"}}

[2022-11-10T10:52:39.306+0100 INFO dapp_runner.runner] Application started.
{"app": {"local_proxy_address": "http://localhost:8082"}}
```

To see the app in action, follow the link provided in `local_proxy_address` variable (the port may be different from `8081` as it's dynamically assigned)

## Running api with golem-manifest.json

Encode [golem-manifest.json](golem-manifest.json) with base64. For example using python:

```python
import base64

with open("golem-manifest.json", mode="r") as f:
    manifest = f.read().encode("utf-8")
encoded_manifest = base64.b64encode(manifest).decode("ascii")
print(encoded_manifest)
```

Having encoded manifest open the [golem-compose.yml](golem-compose.yml) file and update the `manifest` definition with the encoded manifest

```diff
payloads:
  api:
    runtime: "vm/manifest"
    params:
-      manifest: "ewogICAgInZlcnNpb24iOiAiMC4xLjAiLAogICAgImNyZWF0ZWRBdCI6ICIyMDIyLTA3LTI2VDEyOjUxOjAwLjAwMDAwMFoiLAogICAgImV4cGlyZXNBdCI6ICIyMTAwLTAxLTAxVDAwOjAxOjAwLjAwMDAwMFoiLAogICAgIm1ldGFkYXRhIjogewogICAgICAgICJuYW1lIjogIldlYXRoZXIgU3RhdHMgQXBwIiwKICAgICAgICAiZGVzY3JpcHRpb24iOiAiQXBwbGljYXRpb24gdG8gZ2V0IFdlYXRoZXIsIHBvd2VyZWQgYnkgR29sZW0gTmV0d29yayIsCiAgICAgICAgInZlcnNpb24iOiAiMC4xLjAiCiAgICB9LAogICAgInBheWxvYWQiOiBbCiAgICAgICAgewogICAgICAgICAgICAicGxhdGZvcm0iOiB7CiAgICAgICAgICAgICAgICAiYXJjaCI6ICJ4ODZfNjQiLAogICAgICAgICAgICAgICAgIm9zIjogImxpbnV4IgogICAgICAgICAgICB9LAogICAgICAgICAgICAidXJscyI6IFsKICAgICAgICAgICAgICAgICJodHRwOi8veWFjbjIuZGV2LmdvbGVtLm5ldHdvcms6ODAwMC9kb2NrZXItd2VhdGhlcnN0YXRzYXBpLWFwaS1sYXRlc3QtNWIyMTBlYTJmMy5ndm1pIgogICAgICAgICAgICBdLAogICAgICAgICAgICAiaGFzaCI6ICJzaGEzOjM5YzU3NjU4NTdlYjJiMGU2OTBmN2ZhYmU4ZWVjMzE5YmMwZWVlMjRhZWUwZmIzMTdkZGI0MTEwIgogICAgICAgIH0KICAgIF0sCiAgICAiY29tcE1hbmlmZXN0IjogewogICAgICAgICJ2ZXJzaW9uIjogIjAuMS4wIiwKICAgICAgICAic2NyaXB0IjogewogICAgICAgICAgICAiY29tbWFuZHMiOiBbCiAgICAgICAgICAgICAgICAicnVuIC4qdXZpY29ybi4qIgogICAgICAgICAgICBdLAogICAgICAgICAgICAibWF0Y2giOiAicmVnZXgiCiAgICAgICAgfSwKICAgICAgICAibmV0IjogewogICAgICAgICAgICAiaW5ldCI6IHsKICAgICAgICAgICAgICAgICJvdXQiOiB7CiAgICAgICAgICAgICAgICAgICAgInByb3RvY29scyI6IFtdLAogICAgICAgICAgICAgICAgICAgICJ1cmxzIjogW10KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KfQ=="
+      manifest: "<encoded_manifest>"
      capabilities:
        - inet
        - manifest-support
        - vpn
```
