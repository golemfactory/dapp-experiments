#!/bin/bash

source ~/.envs/dapp-runner/bin/activate
source .env
dapp-runner start --config golem-config.yml golem-compose.yml
