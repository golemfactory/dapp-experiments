#!/bin/bash

REAL_URL=${1:-api}
sed -i "s/API_URL/$REAL_URL/" /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'
