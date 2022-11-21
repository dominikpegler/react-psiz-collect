#!/bin/sh
#uvicorn api.main:app --proxy-headers --host 0.0.0.0 --port 5000 & serve -l 80

# for production
gunicorn api.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:5000 & serve -l 80