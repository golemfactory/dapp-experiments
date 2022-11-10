FROM redis:7.0-bullseye

WORKDIR /

RUN apt-get update
RUN apt-get install -y python3-pip

ADD requirements.txt requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

ADD playground playground
