FROM python:3.9-bullseye

ENV http_proxy=http://192.168.10.7:8080
ENV https_proxy=http://192.168.10.7:8080

COPY requirements.txt /tmp

RUN pip install --no-cache-dir --upgrade -r /tmp/requirements.txt
RUN apt update || : && apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
RUN npm i -g serve

EXPOSE 80
EXPOSE 5000

WORKDIR /app

CMD ["./run.sh"]
