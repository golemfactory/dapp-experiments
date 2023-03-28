FROM python:3.9-alpine
RUN apk update
RUN apk add busybox-extras curl
RUN pip install -U pip poetry

RUN mkdir -p /webapp/glm_query
RUN mkdir -p /webapp/templates

COPY glm_query /webapp/glm_query
COPY templates /webapp/templates
COPY pyproject.toml /webapp/
COPY poetry.lock /webapp/

WORKDIR /webapp

RUN poetry install

ENTRYPOINT poetry run glm_query run
