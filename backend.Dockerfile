FROM python:3.9-bullseye

COPY requirements.txt /tmp

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

EXPOSE 5000

WORKDIR /app

# for production
CMD ["gunicorn", "backend.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:5000"]

# for development
# CMD ["uvicorn", "backend.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "5000"]
