FROM python:3.9-slim
RUN pip install -U pip poetry

RUN mkdir /app
COPY server_app/* /app/

WORKDIR /app
RUN poetry install --no-root

ENTRYPOINT poetry run python hello_world.py
