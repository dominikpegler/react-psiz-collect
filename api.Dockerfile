FROM python:3.9-bullseye

COPY requirements.txt /tmp

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt

EXPOSE 5000

WORKDIR /app

CMD ["./run_api.sh"]
