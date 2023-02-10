FROM python:3.10-slim

WORKDIR /

ADD requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

ADD weather weather

ADD .api-env .api-env
