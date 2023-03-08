# TODO List Application

![demo](https://user-images.githubusercontent.com/33448819/223681578-03193431-ed28-46e7-9faf-00bc0ea00613.png)

This application is showcasing how to use Golem Network to host a 3-layer application (**React** + **Flask** + **RQLite**)

The app itself is written without any Golem context in mind, with full dockerization and compose support.
Only Golem-specific files are:

-   **`golem-compose.yml`** to define the application-specific Golem config (image hashes, capabilities, init commands)
-   **`golem-config.yml`** to define the runtime-specific Golem config (yagna appkey, subnet, budget)

## Setup

This section will walk through the app setup for running the already built app on Golem. If you'd like to modify it and
run customized version, please follow the [development guide](#development)

### Install and run yagna daemon

To install the yagna daemon, run the following command:

```
$ curl -ksSf https://join.golem.network/as-requestor | bash -
```

**Application doesn't work on daemon versions lower than v0.11.0**, so please make sure to run this command if you think
your daemon might be outdated (it's safe to run it multiple times, will abort if already installed)

To run the daemon itself, run the following command:

```
$ yagna service run
```

### Configure yagna daemon

The yagna daemon needs some commands to be run in order to work properly as a requestor.
First, in a separate terminal window, we initiate the payment driver by running the following command:

```
# in separate window
$ yagna payment init --sender
```

Next, we need to obtain the application key for runtime config. You can check if you have a key already created by calling

```
$ yagna app-key list
```

**If you don't have a key**, please run the following command to create a new one

```
$ yagna app-key create <key_name>
```

## Running

Having the above setup complete, run the application with the following command (substituting `<your_key>` with an actual key you've obtained in the previous section):

```
YAGNA_APPKEY=<your_key> dapp-runner start --config golem-config.yml golem-compose.yml
```

After running this command, besides debug logs, you should look for the following entries

```
Starting app: ToDo List App

{"db": {"0": "pending"}}
{"db": {"0": "starting"}}
{"db": {"0": "running"}}
{"db": {"0": "running"}, "backend": {"0": "pending"}}
{"db": {"0": "running"}, "backend": {"0": "starting"}}
{"db": {"0": "running"}, "backend": {"0": "running"}}
{"db": {"0": "running"}, "backend": {"0": "running"}, "frontend": {"0": "pending"}}
{"db": {"0": "running"}, "backend": {"0": "running"}, "frontend": {"0": "starting"}}
{"db": {"0": "running"}, "backend": {"0": "running"}, "frontend": {"0": "running"}}

[2022-11-10T10:52:39.306+0100 INFO dapp_runner.runner] Application started.
{"frontend": {"local_proxy_address": "http://localhost:8081"}}
```

To see the app in action, follow the link provided in `local_proxy_address` variable (the port may be different from `8081` as it's dynamically assigned)

## Development

If you'd like to modify this app, the development flow itself doesn't change that much from a regular webapp development,
with the exception of a few additional steps that will be mentioned here.

### Local

To spin off the local development, we need to do the following steps:

-   Run RQLite from Docker
-   Run backend locally
-   Run frontend locally

To start RQLite database from Docker, run the following command

```
$ docker compose build db
$ docker compose up -d db
```

The database should be available on `localhost:4001`.

To start working on the backend, install all the required dependencies and run the app itself with the following commands:

```
$ cd backend
$ python3 -m pip install -U pip
$ python3 -m pip install -r requirements.txt
```

The backend should be available on `localhost:5000`

To start working on the frontend, install all the required dependencies and run the app itself with the following commands:

```
$ cd frontend
$ yarn
$ yarn start
```

The frontend should open itself and should be available on `localhost:3000`

### Deploying on Golem

Once you're satisfied with the changes, the next thing is to deploy this app on Golem. There are a few steps to be followed
to do so:

-   Build containers with Docker Compose
-   Create GVM images from docker images
-   Update the `golem-compose.yml` definition with the updated hashes

**If you have only changed one component (only frontend or only backend), please remember to build and convert only parts related to it**

Starting with the Docker containers, create new images with the following command:

```
$ docker compose build backend frontend
```

This will result in new docker images called `todo-app-backend:latest` and `todo-app-frontend:latest`. These two images will be used
to receive GVMI hashes to be used with `golem-compose.yml`. Process will be the same, only the image name will be different

```
# build backend
$ gvmkit-build todo-app-backend:latest

# upload backend
$ gvmkit-build todo-app-backend:latest --push

# After upload is complete, please take the backend hash value after log with "hash link:"


# build frontend
$ gvmkit-build todo-app-frontend:latest

# upload frontend
$ gvmkit-build todo-app-frontend:latest --push

# After upload is complete, please take the frontend hash value after log with "hash link:"
```

Having both of these hashes, please open the `golem-compose.yml` file and update the `payloads` definition with the updated hashes

```diff
payloads:
  db:
    runtime: "vm"
    params:
      image_hash: "85021afecf51687ecae8bdc21e10f3b11b82d2e3b169ba44e177340c"
  backend:
    runtime: "vm"
    params:
-      image_hash: "7df11ba76dc45f3a36d7c0a2efe318abb05384869b45b260471f4be7"
+      image_hash: "<backend_hash>"
  frontend:
    runtime: "vm"
    params:
-      image_hash: "eb67411fe5e48ee56c6172ebe4cf2a0aa7c80a62dae781fe0d524649"
+      image_hash: "<frontend_hash>"
```

Now, the updated app can be run with the following command

```
YAGNA_APPKEY=<your_key> dapp-runner start --config golem-config.yml golem-compose.yml
```

## Troubleshooting

For any non-listed matter (or just a regular chatter) please write us a message on [chat.golem.network](chat.golem.network)

### I have issues during yagna setup

If you have issues during the yagna daemon initialization, please refer to this [handbook article on getting started as a creator](https://handbook.golem.network/requestor-tutorials/flash-tutorial-of-requestor-development)

### [Errno 104] Connection reset by peer

If you see this error during the `gvmkit-build <image> --push` command, it means the image is already uploaded (no changes detected). Please use the previous hash instead

## Known caveats

These are the things we know are not obvious and maybe a bit hacky, but are applied to make the application work

### NGinX by default doesn't have permissions to serve content

Due to the current limitations, NGinX won't have access to the filesystem to serve the files correctly and will return 404 when accessing correct path.
The workaround for this situation is to run `/bin/chmod a+x /` before the nginx starts.

### Init commands have to be run in the background

Each of the commands listed in the `init` section of the node has to finish its execution. That's why each of the commands,
even if it hangs on the execution like serving the backend, has to be ended with `&` indicating running in the background.

### There is no shell access to the nodes running on providers

Currently, there is no possibility to access the node once it runs on the provider side. One way to mitigate this issue
would be to run [Goth utility](git@github.com:golemfactory/goth.git) to debug what's happening once node gets deployed

### Retrieving complete logs form provider

Currently, collected logs are only fetched from yagna daemon and dapp runtime, logs from the provider side are not
retrievable yet. One way to mitigate this issue would be to run [Goth utility](git@github.com:golemfactory/goth.git)
to have access to provider-side logs.
