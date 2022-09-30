#!/bin/sh
uvicorn api.main:app --host 0.0.0.0 --port 5000 & serve -l 3000