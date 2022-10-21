FROM python:3.9-slim

WORKDIR /webapp
ADD requirements.txt .
RUN pip install -r requirements.txt
ADD templates templates
ADD app.py .
ADD run_http.sh .
