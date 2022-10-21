#!/bin/bash

python app.py initdb --db-address db --db-port 4001
python app.py run --db-address db --db-port 4001