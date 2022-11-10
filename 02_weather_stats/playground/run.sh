#! /bin/bash
redis-server --loglevel debug &
sleep 3 
redis-cli ping > /playground/out.txt 2> /playground/err.txt
uvicorn playground.app:app --host 0.0.0.0 --port 5054
