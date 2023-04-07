FROM python:3.10-slim

WORKDIR /webapp
ADD requirements.freeze.txt .
RUN pip install -r requirements.freeze.txt
ADD app.py .
ADD run_api.sh .
