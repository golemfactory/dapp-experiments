FROM python:3.10-slim

WORKDIR /

RUN apt-get update
RUN apt-get install -y redis-tools

ADD requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

ADD playground playground
