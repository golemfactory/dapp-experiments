# ERC-20 token balance checker

## What is it?

This is an example application that showcases accessing external, whitelisted address in order to
interact with an ERC-20 smart contract through an Ethereum node.

It consists of a Nextjs frontend and a Flask backend that exposes a REST API.

## How to run it?

We're going to show you a quick way to run this example. For a full explanation and more elaborate
description of what Golem is and what you can do with it, please refer to our [handbook](https://handbook.golem.network/).

### Run the yagna daemon

#### Installation

To install the yagna daemon, run the following command:

```shell
$ curl -ksSf https://join.golem.network/as-requestor | bash -
```

#### Running the daemon

```shell
$ yagna service run
```

#### Get some test GLM tokens

```shell
yagna payment fund
```

#### Get the application key

```shell
yagna app-key create requestor
```

Note down the application key.

### Run the app

#### Configure the python virtual environment

```shell
python3 -m venv ~/.envs/dapp-runner
source ~/.envs/dapp-runner/bin/activate
```

#### Install the `dapp-runner`

```shell
pip install dapp-runner
```

#### Run the app

```shell
YAGNA_APPKEY=<your_key> dapp-runner start --config golem-config.yml golem-compose.yml
```

Once you start, you should see some messages describing the current status of your app and once
you get a line like the following:

```
{"frontend": {"local_proxy_address": "http://localhost:80"}}
```

open the listed address in your browser and the app should now be working.

## Next steps

You may wish to have a look at all the other examples in our `dapp-experiments` repository and
dive into the full documentation of Golem's dApps ecosystem in our [handbook](https://handbook.golem.network/).
