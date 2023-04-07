#!/bin/bash

python app.py --db-address db --db-port 4001 initdb
python app.py --db-address db --db-port 4001 run